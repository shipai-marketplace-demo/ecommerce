'use client';

import { useEffect, useRef } from 'react';

interface UserInfo {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  [key: string]: string | undefined;
}

interface ChatbaseIdentifyProps {
  user?: UserInfo | null;
}

declare global {
  interface Window {
    chatbase?: ((action: string, data?: any) => void) & {
      q?: any[];
    };
  }
}

export function ChatbaseIdentify({ user }: ChatbaseIdentifyProps) {
  const hasIdentified = useRef(false);

  useEffect(() => {
    // Only identify if we have a user and haven't already identified
    if (!user || hasIdentified.current) {
      return;
    }

    const identifyUser = async () => {
      try {
        // Generate hash from server
        const response = await fetch('/api/chatbase-hash', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate user hash');
        }

        const { hash } = await response.json();

        // Build user metadata
        const userMetadata: Record<string, string> = {};
        if (user.name) userMetadata.name = user.name;
        if (user.email) userMetadata.email = user.email;
        if (user.company) userMetadata.company = user.company;

        // Add any additional custom fields
        Object.keys(user).forEach((key) => {
          if (key !== 'id' && user[key] && !userMetadata[key]) {
            userMetadata[key] = user[key] as string;
          }
        });

        // Identify user with Chatbase
        if (window.chatbase) {
          window.chatbase('identify', {
            user_id: user.id,
            user_hash: hash,
            user_metadata: userMetadata,
          });

          hasIdentified.current = true;
          console.log('Chatbase user identified:', user.id);
        }
      } catch (error) {
        console.error('Error identifying user with Chatbase:', error);
      }
    };

    // Wait for chatbase to be ready
    const checkChatbase = setInterval(() => {
      if (window.chatbase) {
        clearInterval(checkChatbase);
        identifyUser();
      }
    }, 100);

    // Cleanup interval after 10 seconds if chatbase never loads
    const timeout = setTimeout(() => {
      clearInterval(checkChatbase);
    }, 10000);

    return () => {
      clearInterval(checkChatbase);
      clearTimeout(timeout);
    };
  }, [user]);

  return null; // This component doesn't render anything
}
