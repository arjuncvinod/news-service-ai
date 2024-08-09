import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import styles from './register.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(
      axios.post('http://localhost:3000/register', { email, password, role: 'user'}),
      {
        loading: 'Registering...',
        success: 'Registration successful!',
        error: (err) => err.response?.data?.error || 'Registration failed!',
      }
    ).then(() => {
      navigate('/login');
    });
  };

  return (
    // <div className={styles.registerContainer}>
    //   <h2>Register</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className={styles.formGroup}>
    //       <label className={styles.label}>Email</label>
    //       <input
    //         className={styles.input}
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className={styles.formGroup}>
    //       <label className={styles.label}>Password</label>
    //       <input
    //         className={styles.input}
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button className={styles.button} type="submit">Register</button>
    //   </form>
    // </div>
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-black-600 sm:text-3xl">Get started today</h1>

    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
    Stay updated with the latest headlines and easily access the most current news articles.
    </p>

    <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handleSubmit}>
      <p className="text-center text-lg font-medium">Register your account</p>

      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
      >
        Register
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account? &nbsp;
        <Link className="underline" to={"/login"}>Login</Link>
      </p>
    </form>
  </div>
</div>
  );
};

export default RegisterPage;
