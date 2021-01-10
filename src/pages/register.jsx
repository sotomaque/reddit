import React from 'react';
import { auth } from 'utils/nhost';
import Link from 'next/link';
import { Layout } from 'components/Layout';

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await auth.register(email, password);
    } catch (err) {
      return alert('Register Failed');
    }

    alert('Registration Successful');
  }

  return (
    <Layout>
      <div className="flex flex-col max-w-xl mx-auto shadow p-4 my-12">
        <div className="text-center uppercase text-gray-700 text-sm pb-4">
          Register
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
                Register
              </button>
            </div>

            <div className="pt-6 text-center text-gray-700">
              Already have an account?{' '}
              <Link href="/login">
                <a className="text-indigo-700 hover:underline">Login</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
