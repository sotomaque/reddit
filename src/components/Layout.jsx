import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useAuth } from '@nhost/react-auth';
import Link from 'next/link';
import gql from 'graphql-tag';

import { auth } from 'utils/nhost';

const GET_USER_DATA = gql`
  query getUserData($user_id: uuid!) {
    user: users_by_pk(id: $user_id) {
      id
      display_name
    }
  }
`;

export function UserHeader() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: {
      user_id: auth.getClaim('x-hasura-user-id'),
    },
  });
  async function handleLogout() {
    await auth.logout();
    router.push('/');
  }

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('error fetching user', error);
    return <div>Error...</div>;
  }

  const { user } = data;

  return (
    <div className="flex items-center">
      <div className="px-4">{user?.display_name}</div>
      <span className="cursor-pointer" onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
}

export function Header() {
  const { signedIn } = useAuth();

  return (
    <div className="flex items-center justify-between bg-indigo-700 text-white p-4">
      <div>
        <Link href="/">
          <a>RedditClone</a>
        </Link>
      </div>
      <div className="flex items-center">
        {signedIn && (
          <div>
            <Link href="/new">Create Post</Link>
          </div>
        )}
        <div>
          {signedIn ? (
            <UserHeader />
          ) : (
            <div>
              <Link href="/login">
                <a className="px-4">Login</a>
              </Link>
              <Link href="/register">
                <a className="px-4">Register</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Main({ children }) {
  return <div className="container mx-auto px-4">{children}</div>;
}

export function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
