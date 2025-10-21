'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

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
  status: string;
  severity: string;
}

interface GitHubPullRequest {
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  state: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  body: string;
  comments: number;
}

interface PullRequestWithComments extends GitHubPullRequest {
  commentsList: GitHubComment[];
}

interface PullRequestViewerProps {
  onBack: () => void;
}

export function PullRequestViewer({ onBack }: PullRequestViewerProps) {
  const [pullRequests, setPullRequests] = useState<PullRequestWithComments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPRs, setExpandedPRs] = useState<Set<number>>(new Set());
  const [expandedProviders, setExpandedProviders] = useState<Map<number, Set<string>>>(new Map());
  const [creatingPR, setCreatingPR] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);

  const fetchPullRequests = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      // Fetch from our API route (which handles GitHub authentication)
      const response = await fetch('/api/github/prs');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch pull requests');
      }

      const prsWithComments = await response.json();
      setPullRequests(prsWithComments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pull requests');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPullRequests();
  }, []);

  // Auto-refresh effect
  useEffect(() => {
    if (refreshInterval) {
      const interval = setInterval(() => {
        fetchPullRequests(false); // Don't show loading spinner on auto-refresh
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  const createTestPR = async () => {
    try {
      setCreatingPR(true);
      setError(null);

      const response = await fetch('/api/github/create-buggy-pr', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create test PR');
      }

      const result = await response.json();

      // Immediately refresh to show the new PR (without loading screen)
      await fetchPullRequests(false);

      // Set aggressive refresh for the first 30 seconds (every 3 seconds)
      setRefreshInterval(3000);

      // After 30 seconds, switch to slower refresh (every 10 seconds)
      setTimeout(() => {
        setRefreshInterval(10000);
      }, 30000);

      // After 2 minutes, switch to even slower refresh (every 30 seconds)
      setTimeout(() => {
        setRefreshInterval(30000);
      }, 120000);

      // Stop auto-refresh after 10 minutes
      setTimeout(() => {
        setRefreshInterval(null);
      }, 600000);

      // Expand the new PR automatically
      if (result.pr?.number) {
        setExpandedPRs((prev) => new Set([...prev, result.pr.number]));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create test PR');
    } finally {
      setCreatingPR(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <Container>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-xl">Loading pull requests...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error Loading Pull Requests</h2>
            <p className="text-xl text-primary-100 mb-6">{error}</p>
            <Button onClick={onBack} variant="secondary">
              Back to Home
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const pluralize = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : plural;
  };

  const stripBotSuffix = (username: string) => {
    return username.replace(/\[bot\]$/, '');
  };

  const togglePR = (prNumber: number) => {
    setExpandedPRs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(prNumber)) {
        newSet.delete(prNumber);
      } else {
        newSet.add(prNumber);
      }
      return newSet;
    });
  };

  const toggleProvider = (prNumber: number, provider: string) => {
    setExpandedProviders((prev) => {
      const newMap = new Map(prev);
      const providers = newMap.get(prNumber) || new Set();
      const newProviders = new Set(providers);

      if (newProviders.has(provider)) {
        newProviders.delete(provider);
      } else {
        newProviders.add(provider);
      }

      newMap.set(prNumber, newProviders);
      return newMap;
    });
  };

  // Group comments by provider/author
  const groupCommentsByProvider = (comments: GitHubComment[]) => {
    const grouped: Record<string, GitHubComment[]> = {};
    comments.forEach((comment) => {
      const author = comment.user.login;
      if (!grouped[author]) {
        grouped[author] = [];
      }
      grouped[author].push(comment);
    });
    return grouped;
  };


  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <Container>
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-bold">Open Pull Requests</h2>
          <div className="flex gap-3">
            <Button
              onClick={createTestPR}
              variant="primary"
              size="md"
              disabled={creatingPR}
            >
              {creatingPR ? 'Creating PR...' : 'Create Test PR'}
            </Button>
            <Button onClick={onBack} variant="secondary" size="md">
              Back to Home
            </Button>
          </div>
        </div>

        {pullRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-primary-100">No open pull requests found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                      Pull Request
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pullRequests.map((pr) => {
                    const isPRExpanded = expandedPRs.has(pr.number);
                    const expandedProvidersForPR = expandedProviders.get(pr.number) || new Set();

                    return (
                      <React.Fragment key={pr.number}>
                        {/* PR Row */}
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => togglePR(pr.number)}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                              <svg
                                className={`w-5 h-5 transform transition-transform ${
                                  isPRExpanded ? 'rotate-90' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={pr.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
                            >
                              #{pr.number}: {pr.title}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {(() => {
                                const openCount = pr.commentsList.filter(c => c.status === 'Open').length;
                                const totalCount = pr.commentsList.length;
                                return `${openCount} open ${pluralize(openCount, 'comment', 'comments')} / ${totalCount}`;
                              })()}
                            </span>
                          </td>
                        </tr>

                        {/* Provider Rows (when PR is expanded) */}
                        {isPRExpanded && (
                          <>
                            {pr.commentsList.length === 0 ? (
                              <tr key={`${pr.number}-no-comments`}>
                                <td></td>
                                <td colSpan={2} className="px-6 py-4 bg-gray-50">
                                  <p className="text-sm text-gray-500 italic">No comments yet</p>
                                </td>
                              </tr>
                            ) : (
                              (() => {
                                const groupedComments = groupCommentsByProvider(pr.commentsList);
                                return Object.entries(groupedComments).map(([author, comments]) => {
                                  const isProviderExpanded = expandedProvidersForPR.has(author);

                                  return (
                                    <React.Fragment key={`${pr.number}-provider-${author}`}>
                                      {/* Provider Row */}
                                      <tr className="bg-gray-50 transition-all duration-300 ease-in-out animate-[fadeIn_0.3s_ease-in-out]" style={{animation: 'fadeIn 0.3s ease-in-out'}}>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                          <button
                                            onClick={() => toggleProvider(pr.number, author)}
                                            className="text-gray-500 hover:text-gray-700 focus:outline-none ml-4"
                                          >
                                            <svg
                                              className={`w-4 h-4 transform transition-transform ${
                                                isProviderExpanded ? 'rotate-90' : ''
                                              }`}
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                              />
                                            </svg>
                                          </button>
                                        </td>
                                        <td className="px-6 py-3">
                                          <div className="flex items-center gap-2 ml-4">
                                            <Image
                                              src={comments[0].user.avatar_url}
                                              alt={author}
                                              width={20}
                                              height={20}
                                              className="rounded-full"
                                            />
                                            <span className="text-sm font-medium text-gray-900">
                                              {stripBotSuffix(author)}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                          <span className="text-sm text-gray-600">
                                            {(() => {
                                              const openCount = comments.filter(c => c.status === 'Open').length;
                                              const totalCount = comments.length;
                                              return `${openCount} open ${pluralize(openCount, 'comment', 'comments')} / ${totalCount}`;
                                            })()}
                                          </span>
                                        </td>
                                      </tr>

                                      {/* Individual Comment Rows (when provider is expanded) */}
                                      {isProviderExpanded && comments.map((comment, idx) => {
                                        return (
                                          <tr key={`${pr.number}-${author}-comment-${idx}`} className="bg-gray-100 transition-all duration-300 ease-in-out animate-[fadeIn_0.3s_ease-in-out]" style={{animation: 'fadeIn 0.3s ease-in-out'}}>
                                            <td></td>
                                            <td className="px-6 py-2 pl-16">
                                              <a
                                                href={comment.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-700 hover:text-gray-900 hover:underline block whitespace-nowrap overflow-hidden text-ellipsis max-w-2xl"
                                              >
                                                {truncateText(comment.body, 150)}
                                              </a>
                                            </td>
                                            <td className="px-6 py-2">
                                              <div className="flex items-center gap-2">
                                                {comment.status && comment.status !== 'Open' && (
                                                  <>
                                                    <span className="font-medium text-sm text-gray-900">Status:</span>
                                                    <span className="font-normal text-sm text-gray-700">{comment.status}</span>
                                                    <span className="text-gray-400">|</span>
                                                  </>
                                                )}
                                                <span className="font-medium text-sm text-gray-900">Severity:</span>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                  comment.severity === 'High'
                                                    ? 'bg-red-100 text-red-800'
                                                    : comment.severity === 'Medium'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                  {comment.severity}
                                                </span>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </React.Fragment>
                                  );
                                });
                              })()
                            )}
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </section>
    </>
  );
}
