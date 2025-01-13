import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { type KeyValueStorageInterface } from '@aws-amplify/core';

// Create a storage interface that matches KeyValueStorageInterface
const storage: KeyValueStorageInterface = {
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
    return Promise.resolve();
  },
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem(key);
      return Promise.resolve(value);
    }
    return Promise.resolve(null);
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
    return Promise.resolve();
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
    return Promise.resolve();
  }
};

// Log environment variables to verify they are loaded correctly
console.log('User Pool ID:', process.env.NEXT_PUBLIC_USER_POOL_ID);
console.log('User Pool Client ID:', process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID);

// Initialize Amplify configuration
Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || '',
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
      signUpVerificationMethod: 'code',
      loginWith: {
        username: true,
        email: true,
        phone: false
      }
    }
  }
}, {
  ssr: true
});

// Set the storage provider
if (typeof window !== 'undefined') {
  cognitoUserPoolsTokenProvider.setKeyValueStorage(storage);
}

export default Amplify;