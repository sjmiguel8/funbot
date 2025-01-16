'use client';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

if (typeof window !== 'undefined') {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: 'us-east-2_ZYEQuYWCW',
        userPoolClientId: 'a1gklaqhrfnbfgr39jqsb8nbo',
        identityPoolId: 'us-east-2:18035f27-9c80-4979-b16b-057d1c3105d2',
        loginWith: {
          oauth: {
            domain: 'wavelength.auth.us-east-2.amazoncognito.com',
            scopes: ['openid', 'email', 'profile', 'aws.cognito.signin.user.admin'],
            redirectSignIn: ['http://localhost:3001'],
            redirectSignOut: ['http://localhost:3001'],
            responseType: 'code'
          }
        }
      },
    },
    API: {
      GraphQL: {
        endpoint: process.env.NEXT_PUBLIC_API_URL!,
        region: 'us-east-2',
        defaultAuthMode: 'userPool',
        apiKey: undefined
      }
    }
  });
}

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Authenticator.Provider>
      {children}
    </Authenticator.Provider>
  );
};

export default Providers;
