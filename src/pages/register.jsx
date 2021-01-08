import React from 'react';
import { auth } from 'utils/nhost';

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await auth.register(email, password);
    } catch (err) {
      return alert('Register Failed')
    }

    alert('Registration Successful');
  }

  return (
    <div className="bg-red-200">
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <button>Register</button>
      </form>
    </div>
  )
}