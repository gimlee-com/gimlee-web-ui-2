import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { salesService } from '../services/salesService';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Button } from '../../components/uikit/Button/Button';
import { Form, Input } from '../../components/uikit/Form/Form';
import { Alert } from '../../components/uikit/Alert/Alert';

interface CreateAdForm {
  title: string;
}

const CreateAdPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<CreateAdForm>({
    mode: 'onBlur'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: CreateAdForm) => {
    setLoading(true);
    setError(null);
    try {
      const newAd = await salesService.createAd(data);
      navigate(`/sales/ads/edit/${newAd.id}`);
    } catch (err: any) {
      setError(err.message || t('ads.failedToCreate'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="uk-flex uk-flex-center"
    >
      <div className="uk-width-large">
        <Heading as="h2" className="uk-text-center uk-margin-medium-bottom">
          {t('ads.createNew')}
        </Heading>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="uk-margin">
            <label className="uk-form-label">{t('ads.title')}</label>
            <div className="uk-form-controls">
              <Input
                {...register('title', { required: true, minLength: 3 })}
                placeholder={t('ads.title')}
                status={errors.title ? 'danger' : undefined}
                autoFocus
              />
              {errors.title && (
                <div className="uk-text-danger uk-text-small uk-margin-small-top">
                   {t('auth.errors.minLength', { count: 3 })}
                </div>
              )}
            </div>
          </div>

          <div className="uk-margin-large-top">
            <Button
              type="submit"
              variant="primary"
              className="uk-width-1-1"
              disabled={loading || !isValid}
            >
              {loading ? t('common.loading') : t('common.save')}
            </Button>
            <Button
              type="button"
              className="uk-width-1-1 uk-margin-small-top"
              onClick={() => navigate('/sales/ads')}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </Form>
      </div>
    </motion.div>
  );
};

export default CreateAdPage;
