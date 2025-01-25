'use client'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

interface AuthProps {
  children: React.ReactNode;
}

export function Auth({ children }: AuthProps) {
  return (
    <Authenticator>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {({ signOut, user }) => <div>{children}</div>}
    </Authenticator>
  );
}
