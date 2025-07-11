import Form from '../../components/form/form.js';

export default function SendEmailForm({ email, setEmail, onSubmit }) {
    const fields = [
      { label: 'Email', name: 'email', type: 'email', initialValue: email }
    ];

    const handleSubmit = (formData) => {
      onSubmit(formData);
    };

    return (
      <Form fields={fields} onSubmit={handleSubmit} />
    );
}
