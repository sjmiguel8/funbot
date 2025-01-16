'use client';
import { useEffect, useState } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import useAuth from '@/hooks/useAuth'; // Removed unused import

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authStatus !== 'configuring') {
      setIsLoading(false);
    }
  }, [authStatus]);

  if (isLoading) {
    return <div className="text-light">Loading...</div>;
  }

  return (
    <Authenticator>
      {({ signOut, user }) => {
        if (user) {
          return (
            <div className="authenticated-content">
              <div className="mb-4">
                <button 
                  onClick={signOut}
                  className="btn btn-outline-light"
                >
                  Sign Out
                </button>
              </div>
              {children}
            </div>
          );
        }
        return <div className="text-light p-4">Please sign in to continue</div>;
      }}
    </Authenticator>
  );
} 
