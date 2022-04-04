import { useState, useRef } from 'react';

import { Form, FormState } from 'lib/types';
import SuccessMessage from 'components/SuccessMessage';
import ErrorMessage from 'components/ErrorMessage';
import { LoadingSpinner } from 'components/SvgIcons';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputMsg = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch('/api/sendgrid', {
      body: JSON.stringify({
        name: inputName.current.value,
        email: inputEmail.current.value,
        message: inputMsg.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error
      });
      return;
    }

    inputName.current.value = '';
    inputEmail.current.value = '';
    inputMsg.current.value = '';

    setForm({
      state: Form.Success,
      message: `Hooray! I have received your message.`
    });

    setTimeout(() => setForm({
      state: Form.Initial
    }), 5000);
  };

  return (
    <div className="border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
    <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
      Send a message
  </p>
  <p className="my-1 text-gray-800 dark:text-gray-200">
    Got some questions or comments? Send me a message and I'll try to reply as soon as possible.
  </p>
  <form className="relative my-4" onSubmit={handleSubmit}>
    <span className="mt-1 gap-x-2 flex flex-col sm:flex-row">
    <input
      ref={inputName}
      aria-label="Name"
      placeholder="Name"
      type="text"
      autoComplete="name"
      required
      className="px-4 py-2 mb-2 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    />
  <input
    ref={inputEmail}
  aria-label="Email"
  placeholder="name@example.com"
  type="email"
  autoComplete="email"
  required
  className="px-4 py-2 mb-2 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
  />
      </span>
    <textarea
      ref={inputMsg}
      aria-label="Message"
      placeholder="Your message here"
      autoComplete="off"
      required
      className="px-4 py-2 mb-2 focus:ring-blue-500 min-h-[8rem] sm:min-h-[7rem] focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    />
  <button
    className="flex items-center justify-center px-4 mt-4 font-medium h-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
  type="submit"
    >
    {form.state === Form.Loading ? LoadingSpinner : 'Send'}
    </button>
    </form>
  {form.state === Form.Error ? (
    <ErrorMessage>{form.message}</ErrorMessage>
  ) : form.state === Form.Success ? (
    <SuccessMessage>{form.message}</SuccessMessage>
  ) : ''}
  </div>
);
}
