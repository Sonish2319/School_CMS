import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../../components/form/form.js';

export default function Register() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (formData) => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    if (email === 'admin@admin.com' && password === 'password') {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  const fields = [
    { label: 'Name', name: 'name', type: 'text', initialValue: '' },
    { label: 'Email', name: 'email', type: 'email', initialValue: '' },
    { label: 'Password', name: 'password', type: 'password', initialValue: '' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <Form fields={fields} onSubmit={handleRegister} />
    </div>
  );
}
