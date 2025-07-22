// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Form from '../../components/form/form.js';

// export default function Register() {
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleRegister = async (formData) => {
//     const { name, email, password } = formData;

//     if (!name || !email || !password) {
//       setError('Please fill out all fields.');
//       return;
//     }

//     if (email === 'admin@admin.com' && password === 'password') {
//       router.push('/dashboard');
//     } else {
//       setError('Invalid email or password.');
//     }
//   };

//   const fields = [
//     { label: 'Name', name: 'name', type: 'text', initialValue: '' },
//     { label: 'Email', name: 'email', type: 'email', initialValue: '' },
//     { label: 'Password', name: 'password', type: 'password', initialValue: '' },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <Form fields={fields} onSubmit={handleRegister} />
//     </div>
//   );
// }



import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../../components/form/form.js';
import Link from 'next/link';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Register() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (formData) => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: name,
          email,
          password,
          role: 'entryuser', // or another role based on your UI
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Registration failed.');
      }

      // Registration successful, redirect to login or dashboard
      router.push('/auth/login'); // or /dashboard if auto-login
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  };

  const fields = [
    { label: 'Name', name: 'name', type: 'text', initialValue: '' },
    { label: 'Email', name: 'email', type: 'email', initialValue: '' },
    { label: 'Password', name: 'password', type: 'password', initialValue: '' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6"> School Name</h2>

      <img
            src="/images/narc.png"
            alt="Company Logo"
            className="mx-auto mb-4 w-30 h-30 object-contain"
          />


      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <Form fields={fields} onSubmit={handleRegister} />
      <p className="text-center mt-4">
  Already have an account?{' '}
  <Link href="/auth/login" className="text-blue-500 hover:underline">
    Login here
  </Link>
</p>
    </div>
  );
}

