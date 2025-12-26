import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import type { LoginRequestDto } from '../types/api';
import { Button } from '../components/uikit/Button/Button';
import { Alert } from '../components/uikit/Alert/Alert';
import { Heading } from '../components/uikit/Heading/Heading';

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequestDto>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginRequestDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      if (response.success && response.accessToken) {
        authLogin(response.accessToken);
        navigate('/');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uk-flex uk-flex-center">
      <div className="uk-card uk-card-default uk-card-body uk-width-large">
        <Heading as="h3" className="uk-text-center">Login</Heading>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="uk-margin">
            <label className="uk-form-label">Username</label>
            <div className="uk-form-controls">
              <input
                {...register('username', { required: 'Username is required' })}
                className={`uk-input ${errors.username ? 'uk-form-danger' : ''}`}
                type="text"
                placeholder="Username"
              />
              {errors.username && <span className="uk-text-danger uk-text-small">{errors.username.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Password</label>
            <div className="uk-form-controls">
              <input
                {...register('password', { required: 'Password is required' })}
                className={`uk-input ${errors.password ? 'uk-form-danger' : ''}`}
                type="password"
                placeholder="Password"
              />
              {errors.password && <span className="uk-text-danger uk-text-small">{errors.password.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <Button type="submit" variant="primary" className="uk-width-1-1" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
        <div className="uk-text-center uk-margin-top">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
