'use client';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </div>
  );
} 