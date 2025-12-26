import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import type { RegisterRequestDto } from '../types/api';
import { Button } from '../components/uikit/Button/Button';
import { Alert } from '../components/uikit/Alert/Alert';
import { Heading } from '../components/uikit/Heading/Heading';

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequestDto>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const onRegisterSubmit = async (data: RegisterRequestDto) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(data);
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const onVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.verifyUser({ code: verificationCode });
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verify') {
    return (
      <div className="uk-flex uk-flex-center">
        <div className="uk-card uk-card-default uk-card-body uk-width-large">
          <Heading as="h3" className="uk-text-center">Verify Your Account</Heading>
          <p className="uk-text-center">Please enter the verification code sent to your email.</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={onVerifySubmit}>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Verification Code"
                required
              />
            </div>
            <div className="uk-margin">
              <Button type="submit" variant="primary" className="uk-width-1-1" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="uk-flex uk-flex-center">
      <div className="uk-card uk-card-default uk-card-body uk-width-large">
        <Heading as="h3" className="uk-text-center">Register</Heading>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit(onRegisterSubmit)}>
          <div className="uk-margin">
            <label className="uk-form-label">Username</label>
            <div className="uk-form-controls">
              <input
                {...register('username', { 
                  required: 'Username is required',
                  validate: async (value) => {
                    const res = await authService.checkUsername(value);
                    return res.available || 'Username is already taken';
                  }
                })}
                className={`uk-input ${errors.username ? 'uk-form-danger' : ''}`}
                type="text"
                placeholder="Username"
              />
              {errors.username && <span className="uk-text-danger uk-text-small">{errors.username.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Email</label>
            <div className="uk-form-controls">
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                  validate: async (value) => {
                    const res = await authService.checkEmail(value);
                    return res.available || 'Email is already registered';
                  }
                })}
                className={`uk-input ${errors.email ? 'uk-form-danger' : ''}`}
                type="email"
                placeholder="Email"
              />
              {errors.email && <span className="uk-text-danger uk-text-small">{errors.email.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Password</label>
            <div className="uk-form-controls">
              <input
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                className={`uk-input ${errors.password ? 'uk-form-danger' : ''}`}
                type="password"
                placeholder="Password"
              />
              {errors.password && <span className="uk-text-danger uk-text-small">{errors.password.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <Button type="submit" variant="primary" className="uk-width-1-1" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="uk-text-center uk-margin-top">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
