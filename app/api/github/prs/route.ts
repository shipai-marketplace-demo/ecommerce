import { NextResponse } from 'next/server';

interface GitHubComment {
  id: number;
  user: {
    login: string;
    avatar_url: string;
  };
  body: string;
  created_at: string;
  html_url: string;
  path?: string;
  line?: number;
  commit_id?: string;
  state?: string;
}

interface ProcessedComment extends GitHubComment {
  status: string;
  severity: string;
}

// Extract status and severity from comment body or metadata
function extractMetadata(comment: GitHubComment): { status: string; severity: string } {
  let status = '';
  let severity = 'Low';

  const body = comment.body;
  const bodyLower = body.toLowerCase();

  // Differentiate between review comments (inline) and issue comments (top-level)
  // Review comments have path and line fields, issue comments don't
  const isReviewComment = comment.path !== undefined || comment.line !== undefined;

  if (isReviewComment) {
    // This is a review comment (inline code comment)
    console.log(`[Review Comment] ID: ${comment.id}, User: ${comment.user.login}, Path: ${comment.path}, State: ${comment.state}`);

    // Check GitHub's state field for resolution
    if (comment.state && comment.state.toLowerCase() === 'resolved') {
      status = 'Resolved';
    } else {
      // If state is not "resolved", it's still open
      status = 'Open';
    }
  } else {
    // This is an issue comment (top-level comment) - no status
    console.log(`[Issue Comment] ID: ${comment.id}, User: ${comment.user.login}, No path/line field`);
    // Check for explicit resolved indicators in body
    if (bodyLower.includes('resolved') || bodyLower.includes('fixed') || bodyLower.includes('✅') || bodyLower.includes('✓')) {
      status = 'Resolved';
    }
    // Otherwise leave status empty for issue comments
  }

  // Extract severity from comment body with multiple patterns
  const severityMatch = body.match(/\*\*Severity:\*\*\s*([^\n]+)/i) ||
                        body.match(/Severity:\s*([^\n]+)/i) ||
                        body.match(/\*\*Priority:\*\*\s*([^\n]+)/i) ||
                        body.match(/Priority:\s*([^\n]+)/i) ||
                        body.match(/\*\*Risk:\*\*\s*([^\n]+)/i) ||
                        body.match(/Risk:\s*([^\n]+)/i);

  if (severityMatch) {
    const severityText = severityMatch[1].trim().toLowerCase();
    if (severityText.includes('critical') || severityText.includes('high')) {
      severity = 'High';
    } else if (severityText.includes('medium') || severityText.includes('moderate')) {
      severity = 'Medium';
    } else {
      severity = 'Low';
    }
  }

  // Detect severity from common terms in the body
  if (severity === 'Low') {
    if (bodyLower.includes('critical') || bodyLower.includes('🔴')) {
      severity = 'High';
    } else if (bodyLower.includes('high risk') || bodyLower.includes('security') || bodyLower.includes('vulnerability')) {
      severity = 'High';
    } else if (bodyLower.includes('medium') || bodyLower.includes('moderate') || bodyLower.includes('🟡') || bodyLower.includes('⚠️')) {
      severity = 'Medium';
    } else if (bodyLower.includes('warning:')) {
      severity = 'Medium';
    } else if (bodyLower.includes('error:') || bodyLower.includes('bug:')) {
      severity = 'Medium';
    }
    // Everything else stays Low (including suggestion, note, info, etc.)
  }

  return { status, severity };
}

// Group comments by author/provider
function groupCommentsByProvider(comments: ProcessedComment[]): Record<string, ProcessedComment[]> {
  const grouped: Record<string, ProcessedComment[]> = {};
  comments.forEach((comment) => {
    const author = comment.user.login;
    if (!grouped[author]) {
      grouped[author] = [];
    }
    grouped[author].push(comment);
  });
  return grouped;
}

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;

    console.log('[GitHub API] Starting request...');
    console.log('[GitHub API] Token exists:', !!githubToken);
    console.log('[GitHub API] Token length:', githubToken?.length);
    console.log('[GitHub API] Token prefix:', githubToken?.substring(0, 20));

    if (!githubToken) {
      console.error('[GitHub API] No token configured');
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    const headers = {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${githubToken}`,
    };

    console.log('[GitHub API] Fetching PRs from GitHub...');

    // Fetch open pull requests
    const prsResponse = await fetch(
      'https://api.github.com/repos/shipai-marketplace-demo/ecommerce/pulls?state=open',
      { headers }
    );

    console.log('[GitHub API] Response status:', prsResponse.status);
    console.log('[GitHub API] Response statusText:', prsResponse.statusText);

    if (!prsResponse.ok) {
      const errorText = await prsResponse.text();
      console.error('[GitHub API] Error response:', errorText);
      return NextResponse.json(
        {
          error: `Failed to fetch PRs: ${prsResponse.statusText}`,
          details: errorText,
          status: prsResponse.status,
          tokenInfo: {
            hasToken: !!githubToken,
            tokenLength: githubToken?.length,
            tokenPrefix: githubToken?.substring(0, 20),
          }
        },
        { status: prsResponse.status }
      );
    }

    const prs = await prsResponse.json();

    // Fetch comments for each PR (both issue comments and review comments)
    const prsWithComments = await Promise.all(
      prs.map(async (pr: any) => {
        try {
          // Fetch issue comments
          const issueCommentsResponse = await fetch(
            `https://api.github.com/repos/shipai-marketplace-demo/ecommerce/issues/${pr.number}/comments`,
            { headers }
          );

          // Fetch review comments (inline code comments)
          const reviewCommentsResponse = await fetch(
            `https://api.github.com/repos/shipai-marketplace-demo/ecommerce/pulls/${pr.number}/comments`,
            { headers }
          );

          let allComments: GitHubComment[] = [];

          if (issueCommentsResponse.ok) {
            const issueComments = await issueCommentsResponse.json();
            allComments = [...allComments, ...issueComments];
          }

          if (reviewCommentsResponse.ok) {
            const reviewComments = await reviewCommentsResponse.json();
            allComments = [...allComments, ...reviewComments];
          }

          // Process each comment to extract status and severity
          const processedComments: ProcessedComment[] = allComments.map((comment) => {
            const { status, severity } = extractMetadata(comment);
            return { ...comment, status, severity };
          });

          // Sort by creation date
          processedComments.sort(
            (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );

          // Group by provider
          const groupedComments = groupCommentsByProvider(processedComments);

          return {
            number: pr.number,
            title: pr.title,
            html_url: pr.html_url,
            user: pr.user,
            state: pr.state,
            created_at: pr.created_at,
            updated_at: pr.updated_at,
            body: pr.body,
            commentsList: processedComments,
            groupedComments,
          };
        } catch (error) {
          console.error(`Error fetching comments for PR #${pr.number}:`, error);
          return {
            ...pr,
            commentsList: [],
            groupedComments: {},
          };
        }
      })
    );

    return NextResponse.json(prsWithComments);
  } catch (error) {
    console.error('Error in /api/github/prs:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch pull requests' },
      { status: 500 }
    );
  }
}
