import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import type { LoginRequestDto } from '../types/api';
import { Button } from '../components/uikit/Button/Button';
import { Alert } from '../components/uikit/Alert/Alert';
import { Heading } from '../components/uikit/Heading/Heading';
import { Form, FormLabel, FormControls, Input, FormMessage, AnimatePresence, motion } from '../components/uikit/Form/Form';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginRequestDto>({
    mode: 'onChange'
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '/';

  const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;

  const validatePassword = (value: string | undefined) => {
    if (!value) return true;
    return passwordRule.test(value);
  };

  const onSubmit = async (data: LoginRequestDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      if (response.success && response.accessToken) {
        authLogin(response.accessToken);
        navigate(redirect);
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
        <Form layout="stacked" onSubmit={handleSubmit(onSubmit)}>
          <motion.div layout className="uk-margin">
            <FormLabel>{t('auth.username')}</FormLabel>
            <FormControls>
              <Input
                {...register('username', { required: t('auth.errors.required', { field: t('auth.username') }) })}
                status={errors.username ? 'danger' : undefined}
                type="text"
                placeholder={t('auth.username')}
              />
              <AnimatePresence>
                {errors.username && <FormMessage>{errors.username.message}</FormMessage>}
              </AnimatePresence>
            </FormControls>
          </motion.div>
          <motion.div layout className="uk-margin">
            <FormLabel>{t('auth.password')}</FormLabel>
            <FormControls>
              <Input
                {...register('password', { 
                  required: t('auth.errors.required', { field: t('auth.password') }),
                  validate: validatePassword
                })}
                status={errors.password && errors.password.type === 'required' ? 'danger' : undefined}
                type="password"
                placeholder={t('auth.password')}
              />
              <AnimatePresence>
                {errors.password && errors.password.type === 'required' && (
                  <FormMessage>{errors.password.message}</FormMessage>
                )}
              </AnimatePresence>
            </FormControls>
          </motion.div>
          <motion.div layout className="uk-margin">
            <Button type="submit" variant="primary" className="uk-width-1-1" disabled={!isValid || loading}>
              {loading ? t('auth.loggingIn') : t('auth.loginTitle')}
            </Button>
          </motion.div>
        </Form>
        <div className="uk-text-center uk-margin-top">
          {t('auth.noAccount')} <Link to="/register">{t('navbar.register')}</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
