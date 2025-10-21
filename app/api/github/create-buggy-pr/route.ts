import { NextResponse } from 'next/server';

const REPO_OWNER = 'shipai-marketplace-demo';
const REPO_NAME = 'ecommerce';

// Generate buggy code with various obvious issues
function generateBuggyCode(): string {
  const timestamp = Date.now();
  return `// Auto-generated test file with intentional bugs
// Created at: ${new Date().toISOString()}

export function calculateTotal(items: any[]): number {
  let total = 0;

  // Bug 1: No null/undefined check
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }

  // Bug 2: SQL Injection vulnerability
  const query = "SELECT * FROM orders WHERE user_id = '" + getUserId() + "'";

  // Bug 3: Hardcoded credentials (obviously fake but still bad practice)
  const API_KEY = "fake_api_key_12345_DO_NOT_COMMIT";
  const PASSWORD = "admin123";

  // Bug 4: Unhandled promise rejection
  fetch('https://api.example.com/data')
    .then(response => response.json());

  // Bug 5: Memory leak - event listener never removed
  window.addEventListener('scroll', () => {
    console.log('scrolling');
  });

  // Bug 6: Using eval (security risk)
  const userInput = getInput();
  eval(userInput);

  // Bug 7: Race condition - no await
  async function getData() {
    const data = fetchData();
    return data.map(item => item.id);
  }

  // Bug 8: Division by zero
  const average = total / 0;

  // Bug 9: Unused variable
  const unusedVar = "This is never used";

  // Bug 10: Type mismatch
  return "total: " + total; // Should return number, not string
}

function getUserId(): string {
  return "user123";
}

function getInput(): string {
  return "alert('xss')";
}

async function fetchData(): Promise<any[]> {
  return [];
}
`;
}

export async function POST() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    const headers = {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${githubToken}`,
      'Content-Type': 'application/json',
    };

    // Step 1: Get the default branch and its latest commit SHA
    const repoResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`,
      { headers }
    );

    if (!repoResponse.ok) {
      throw new Error(`Failed to fetch repo info: ${repoResponse.statusText}`);
    }

    const repo = await repoResponse.json();
    const defaultBranch = repo.default_branch;

    // Get the latest commit SHA of the default branch
    const refResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${defaultBranch}`,
      { headers }
    );

    if (!refResponse.ok) {
      throw new Error(`Failed to fetch ref: ${refResponse.statusText}`);
    }

    const refData = await refResponse.json();
    const baseSha = refData.object.sha;

    // Step 2: Create a new branch
    const timestamp = Date.now();
    const branchName = `test/buggy-code-${timestamp}`;

    const createBranchResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: baseSha,
        }),
      }
    );

    if (!createBranchResponse.ok) {
      const errorText = await createBranchResponse.text();
      throw new Error(`Failed to create branch: ${errorText}`);
    }

    // Step 3: Create a blob with the buggy code
    const buggyCode = generateBuggyCode();

    // Convert to base64 using btoa (works in both Node and Edge runtime)
    const base64Content = btoa(unescape(encodeURIComponent(buggyCode)));

    const createBlobResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/blobs`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          content: base64Content,
          encoding: 'base64',
        }),
      }
    );

    if (!createBlobResponse.ok) {
      const errorText = await createBlobResponse.text();
      console.error('Blob creation error:', errorText);
      throw new Error(`Failed to create blob: ${createBlobResponse.statusText} - ${errorText}`);
    }

    const blob = await createBlobResponse.json();

    // Step 4: Get the base tree
    const baseTreeResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/commits/${baseSha}`,
      { headers }
    );

    if (!baseTreeResponse.ok) {
      throw new Error(`Failed to get base tree: ${baseTreeResponse.statusText}`);
    }

    const baseCommit = await baseTreeResponse.json();
    const baseTreeSha = baseCommit.tree.sha;

    // Step 5: Create a new tree with the buggy file
    const fileName = `lib/buggy-code-${timestamp}.ts`;
    const createTreeResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: [
            {
              path: fileName,
              mode: '100644',
              type: 'blob',
              sha: blob.sha,
            },
          ],
        }),
      }
    );

    if (!createTreeResponse.ok) {
      throw new Error(`Failed to create tree: ${createTreeResponse.statusText}`);
    }

    const tree = await createTreeResponse.json();

    // Step 6: Create a commit
    const createCommitResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: `Add buggy code for testing (${timestamp})`,
          tree: tree.sha,
          parents: [baseSha],
        }),
      }
    );

    if (!createCommitResponse.ok) {
      throw new Error(`Failed to create commit: ${createCommitResponse.statusText}`);
    }

    const commit = await createCommitResponse.json();

    // Step 7: Update the branch reference to point to the new commit
    const updateRefResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${branchName}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          sha: commit.sha,
        }),
      }
    );

    if (!updateRefResponse.ok) {
      throw new Error(`Failed to update ref: ${updateRefResponse.statusText}`);
    }

    // Step 8: Create a pull request
    const createPRResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: `[TEST] Buggy code for testing - ${new Date().toLocaleString()}`,
          body: `This is a test PR with intentional bugs to trigger automated code review bots.

## Known Issues in this PR:
1. ❌ No null/undefined checks
2. ❌ SQL Injection vulnerability
3. ❌ Hardcoded credentials (API keys and passwords)
4. ❌ Unhandled promise rejection
5. ❌ Memory leak (event listener never removed)
6. ❌ Using eval() (major security risk)
7. ❌ Race condition (missing await)
8. ❌ Division by zero
9. ❌ Unused variables
10. ❌ Type mismatches

This PR should trigger multiple automated review comments from bots.`,
          head: branchName,
          base: defaultBranch,
        }),
      }
    );

    if (!createPRResponse.ok) {
      const errorText = await createPRResponse.text();
      throw new Error(`Failed to create PR: ${errorText}`);
    }

    const pr = await createPRResponse.json();

    return NextResponse.json({
      success: true,
      pr: {
        number: pr.number,
        title: pr.title,
        html_url: pr.html_url,
        branch: branchName,
      },
    });
  } catch (error) {
    console.error('Error creating buggy PR:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create PR' },
      { status: 500 }
    );
  }
}
