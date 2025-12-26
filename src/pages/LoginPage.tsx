import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import type { LoginRequestDto } from '../types/api';
import { Button } from '../components/uikit/Button/Button';
import { Alert } from '../components/uikit/Alert/Alert';
import { Heading } from '../components/uikit/Heading/Heading';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
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
        setError(t('auth.errors.loginFailed'));
      }
    } catch (err: any) {
      setError(err.message || t('auth.errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uk-flex uk-flex-center">
      <div className="uk-card uk-card-default uk-card-body uk-width-large">
        <Heading as="h3" className="uk-text-center">{t('auth.loginTitle')}</Heading>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="uk-margin">
            <label className="uk-form-label">{t('auth.username')}</label>
            <div className="uk-form-controls">
              <input
                {...register('username', { required: t('auth.errors.required', { field: t('auth.username') }) })}
                className={`uk-input ${errors.username ? 'uk-form-danger' : ''}`}
                type="text"
                placeholder={t('auth.username')}
              />
              {errors.username && <span className="uk-text-danger uk-text-small">{errors.username.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">{t('auth.password')}</label>
            <div className="uk-form-controls">
              <input
                {...register('password', { required: t('auth.errors.required', { field: t('auth.password') }) })}
                className={`uk-input ${errors.password ? 'uk-form-danger' : ''}`}
                type="password"
                placeholder={t('auth.password')}
              />
              {errors.password && <span className="uk-text-danger uk-text-small">{errors.password.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <Button type="submit" variant="primary" className="uk-width-1-1" disabled={loading}>
              {loading ? t('auth.loggingIn') : t('auth.loginTitle')}
            </Button>
          </div>
        </form>
        <div className="uk-text-center uk-margin-top">
          {t('auth.noAccount')} <Link to="/register">{t('navbar.register')}</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
