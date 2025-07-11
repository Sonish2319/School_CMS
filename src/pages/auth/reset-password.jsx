import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../../components/form/form.js';

export default function ResetPassword() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleResetPassword = async (formData) => {
    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setMessage('Your password has been successfully reset.');
    setTimeout(() => router.push('/auth/login'), 2000);
  };

  const fields = [
    { label: 'New Password', name: 'newPassword', type: 'password', initialValue: '' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password', initialValue: '' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Reset Password</h2>
        {message && (
          <p className="text-red-500 text-center mb-4" aria-live="assertive">{message}</p>
        )}
        <Form fields={fields} onSubmit={handleResetPassword} />
      </div>
    </div>
  );
}
