import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { auth } from 'utils/nhost';
import { Layout } from 'components/Layout';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await auth.login(email, password);
    } catch (err) {
      return alert('Login Failed');
    }

    alert('Login Successful');
    // redirect user
    router.push('/');
  }

  return (
    <Layout>
      <div className="flex flex-col max-w-xl mx-auto shadow p-4 my-12">
        <div className="text-center uppercase text-gray-700 text-sm pb-4">
          Login
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              autoFocus
              className="border rounded px-2 py-1 my-2"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              value={email}
            />
            <input
              className="border rounded px-2 py-1 my-2"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              value={password}
            />
            <div className="flex justify-center">
              <button className="inline bg-indigo-700 text-white uppercase px-4 py-2">
                Login
              </button>
            </div>

            <div className="pt-6 text-center text-gray-700">
              Don't have an account?{' '}
              <Link href="/register">
                <a className="text-indigo-700 hover:underline">Register</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
