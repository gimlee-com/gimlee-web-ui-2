import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';
import type { RegisterRequestDto } from '../types/api';
import { Button } from '../components/uikit/Button/Button';
import { Alert } from '../components/uikit/Alert/Alert';
import { Heading } from '../components/uikit/Heading/Heading';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
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
          <Heading as="h3" className="uk-text-center">{t('auth.verifyTitle')}</Heading>
          <p className="uk-text-center">{t('auth.verifyText')}</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={onVerifySubmit}>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder={t('auth.verifyButton')}
                required
              />
            </div>
            <div className="uk-margin">
              <Button type="submit" variant="primary" className="uk-width-1-1" disabled={loading}>
                {loading ? t('auth.verifying') : t('auth.verifyButton')}
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
        <Heading as="h3" className="uk-text-center">{t('auth.registerTitle')}</Heading>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit(onRegisterSubmit)}>
          <div className="uk-margin">
            <label className="uk-form-label">{t('auth.username')}</label>
            <div className="uk-form-controls">
              <input
                {...register('username', { 
                  required: t('auth.errors.required', { field: t('auth.username') }),
                  validate: async (value) => {
                    const res = await authService.checkUsername(value);
                    return res.available || t('auth.errors.generic'); // Or add a specific "taken" key
                  }
                })}
                className={`uk-input ${errors.username ? 'uk-form-danger' : ''}`}
                type="text"
                placeholder={t('auth.username')}
              />
              {errors.username && <span className="uk-text-danger uk-text-small">{errors.username.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">{t('auth.email')}</label>
            <div className="uk-form-controls">
              <input
                {...register('email', { 
                  required: t('auth.errors.required', { field: t('auth.email') }),
                  pattern: { value: /^\S+@\S+$/i, message: t('auth.errors.generic') },
                  validate: async (value) => {
                    const res = await authService.checkEmail(value);
                    return res.available || t('auth.errors.generic');
                  }
                })}
                className={`uk-input ${errors.email ? 'uk-form-danger' : ''}`}
                type="email"
                placeholder={t('auth.email')}
              />
              {errors.email && <span className="uk-text-danger uk-text-small">{errors.email.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">{t('auth.password')}</label>
            <div className="uk-form-controls">
              <input
                {...register('password', { 
                  required: t('auth.errors.required', { field: t('auth.password') }), 
                  minLength: { value: 6, message: t('auth.errors.minLength', { count: 6 }) } 
                })}
                className={`uk-input ${errors.password ? 'uk-form-danger' : ''}`}
                type="password"
                placeholder={t('auth.password')}
              />
              {errors.password && <span className="uk-text-danger uk-text-small">{errors.password.message}</span>}
            </div>
          </div>
          <div className="uk-margin">
            <Button type="submit" variant="primary" className="uk-width-1-1" disabled={loading}>
              {loading ? t('auth.registering') : t('auth.registerTitle')}
            </Button>
          </div>
        </form>
        <div className="uk-text-center uk-margin-top">
          {t('auth.hasAccount')} <Link to="/login">{t('navbar.login')}</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
