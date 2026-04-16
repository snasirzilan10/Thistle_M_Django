import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app you would call API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-3">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" size="md">Subscribe</Button>
      </div>
      {submitted && <p className="text-green-400 text-sm mt-3">Thank you! You're now subscribed.</p>}
    </form>
  );
};

export default NewsletterForm;