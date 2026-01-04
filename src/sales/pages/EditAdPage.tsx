import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { salesService } from '../services/salesService';
import { cityService } from '../../ads/services/cityService';
import { apiClient } from '../../services/apiClient';
import type { AdDetailsDto, UpdateAdRequestDto, CitySuggestion, CityDetailsDto, MediaUploadResponseDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Button } from '../../components/uikit/Button/Button';
import { Alert } from '../../components/uikit/Alert/Alert';
import { Label } from '../../components/uikit/Label/Label';
import { Form, Input, TextArea, Select } from '../../components/uikit/Form/Form';
import { Grid } from '../../components/uikit/Grid/Grid';

const API_URL = import.meta.env.VITE_API_URL || '';

const EditAdPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateAdRequestDto>({
    mode: 'onBlur'
  });
  const [ad, setAd] = useState<AdDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaPaths, setMediaPaths] = useState<string[]>([]);
  const [mainPhotoPath, setMainPhotoPath] = useState<string | null>(null);
  const [citySearch, setCitySearch] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityDetailsDto | null>(null);

  useEffect(() => {
    if (id) {
      salesService.getAdById(id)
        .then(data => {
          setAd(data);
          setMediaPaths(data.mediaPaths || []);
          setMainPhotoPath(data.mainPhotoPath || null);
          if (data.location?.city) {
            setSelectedCity(data.location.city);
            setCitySearch(`${data.location.city.name}, ${data.location.city.country}`);
          }
          reset({
            title: data.title,
            description: data.description,
            price: data.price?.amount,
            currency: data.price?.currency,
            mainPhotoPath: data.mainPhotoPath,
            mediaPaths: data.mediaPaths,
            stock: data.stock
          });
        })
        .catch(err => setError(err.message || 'Failed to load ad'))
        .finally(() => setLoading(false));
    }
  }, [id, reset]);

  const handleCitySearch = async (val: string) => {
    setCitySearch(val);
    if (val.length > 2) {
      try {
        const suggestions = await cityService.getSuggestions(val);
        setCitySuggestions(suggestions);
      } catch (err) {
        console.error('Failed to fetch city suggestions', err);
      }
    } else {
      setCitySuggestions([]);
    }
  };

  const selectCity = (city: CityDetailsDto) => {
    setSelectedCity(city);
    setCitySearch(`${city.name}, ${city.country}`);
    setCitySuggestions([]);
  };

  const onSubmit = async (data: UpdateAdRequestDto) => {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const updateData: UpdateAdRequestDto = {
          ...data,
          mediaPaths,
          mainPhotoPath: mainPhotoPath || undefined,
          location: selectedCity ? { cityId: selectedCity.id } : undefined
      };
      await salesService.updateAd(id, updateData);
      navigate('/sales/ads');
    } catch (err: any) {
      setError(err.message || 'Failed to update ad');
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (files: FileList) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
    }
    try {
        const response = await apiClient.post<MediaUploadResponseDto | MediaUploadResponseDto[]>('/media/upload', formData);
        
        let newPaths: string[] = [];
        if (Array.isArray(response)) {
          newPaths = response.map(r => r.path);
        } else if (response && response.path) {
          newPaths = [response.path];
        }

        setMediaPaths(prev => {
          const updated = [...prev, ...newPaths];
          if (!mainPhotoPath && updated.length > 0) {
            setMainPhotoPath(updated[0]);
          }
          return updated;
        });
    } catch (err: any) {
        setError(err.message || 'Upload failed');
    }
  };

  if (loading) return <div className="uk-flex uk-flex-center uk-margin-large-top"><Spinner ratio={2} /></div>;
  if (!ad) return <Alert variant="danger">{t('ads.notFound')}</Alert>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Heading as="h2" className="uk-margin-medium-bottom">{t('ads.editTitle')}: {ad.title}</Heading>
      
      {error && <Alert variant="danger" onClose={() => setError(null)}>{error}</Alert>}
  
      <Form onSubmit={handleSubmit(onSubmit)} layout="stacked">
        <div className="uk-margin">
          <label className="uk-form-label">{t('ads.title')}</label>
          <Input 
            {...register('title', { required: true })} 
            status={errors.title ? 'danger' : undefined}
          />
        </div>

        <div className="uk-margin">
          <label className="uk-form-label">{t('ads.description')}</label>
          <TextArea {...register('description')} rows={5} />
        </div>

        <div className="uk-margin">
          <label className="uk-form-label">{t('ads.city')}</label>
          <div className="uk-inline uk-width-1-1">
            <Input
              type="text"
              placeholder={t('ads.cityPlaceholder')}
              value={citySearch}
              onChange={(e) => handleCitySearch(e.target.value)}
            />
            <AnimatePresence>
              {citySuggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="uk-dropdown uk-show uk-width-1-1" 
                  style={{ position: 'absolute', zIndex: 1000 }}
                >
                  <ul className="uk-nav uk-dropdown-nav">
                    {citySuggestions.map(suggestion => (
                      <li key={suggestion.city.id}>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectCity(suggestion.city); }}>
                          {suggestion.city.name}, {suggestion.city.country}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Grid gap="small">
          <div className="uk-width-1-2@m">
            <label className="uk-form-label">{t('ads.price')}</label>
            <Input {...register('price')} type="number" step="0.00000001" />
          </div>
          <div className="uk-width-1-2@m">
            <label className="uk-form-label">{t('ads.currency')}</label>
            <Select {...register('currency')}>
              <option value="USD">USD</option>
              <option value="ARRR">ARRR (Pirate Chain)</option>
            </Select>
          </div>
        </Grid>

        <div className="uk-margin">
          <label className="uk-form-label">{t('ads.stock')}</label>
          <Input {...register('stock')} type="number" min="0" />
        </div>

        <div className="uk-margin">
          <label className="uk-form-label">{t('ads.media')}</label>
          <div className="uk-placeholder uk-text-center uk-padding-large uk-border-rounded">
            <span uk-icon="icon: cloud-upload; ratio: 2"></span>
            <div className="uk-margin-small-top">
              <span className="uk-text-middle">{t('ads.uploadText')}</span>
              <div uk-form-custom="">
                <input type="file" multiple onChange={(e) => e.target.files && handleUpload(e.target.files)} />
                <span className="uk-link uk-text-bold">{t('ads.selectFiles')}</span>
              </div>
            </div>
          </div>
          
          <Grid gap="small" className="uk-child-width-1-2 uk-child-width-1-4@m uk-margin-top">
            <AnimatePresence>
              {mediaPaths.map((path) => (
                <motion.div 
                  key={path} 
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="uk-inline"
                >
                  <div className="uk-card uk-card-default uk-card-body uk-padding-remove uk-overflow-hidden uk-border-rounded">
                    <img 
                      src={`${API_URL}/api/media?p=${path}`} 
                      alt="media" 
                      style={{ height: '150px', width: '100%', objectFit: 'cover', cursor: 'pointer' }} 
                      onClick={() => setMainPhotoPath(path)}
                    />
                    <div className="uk-position-top-left uk-padding-small">
                        <button 
                          type="button" 
                          className={`uk-icon-button ${mainPhotoPath === path ? 'uk-button-primary' : 'uk-background-default'}`} 
                          onClick={() => setMainPhotoPath(path)}
                          title={t('ads.setAsMain')}
                          uk-icon={`icon: ${mainPhotoPath === path ? 'star' : 'plus'}; ratio: 0.8`}
                        ></button>
                    </div>
                    <div className="uk-position-top-right uk-padding-small">
                        <button 
                          type="button" 
                          className="uk-close uk-background-default uk-border-circle uk-padding-small" 
                          onClick={() => {
                            const updated = mediaPaths.filter(p => p !== path);
                            setMediaPaths(updated);
                            if (mainPhotoPath === path) {
                              setMainPhotoPath(updated.length > 0 ? updated[0] : null);
                            }
                          }}
                          uk-icon="icon: close; ratio: 0.8"
                        ></button>
                    </div>
                    {mainPhotoPath === path && (
                      <div className="uk-position-bottom-center uk-margin-small-bottom">
                        <Label variant="success">{t('ads.mainPhoto')}</Label>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </Grid>
        </div>

        <div className="uk-margin-large-top uk-flex uk-flex-right">
          <Button 
            type="button" 
            className="uk-margin-right" 
            onClick={() => navigate('/sales/ads')}
          >
            {t('common.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? <><Spinner ratio={0.5} className="uk-margin-small-right" /> {t('ads.saving')}</> : t('common.save')}
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default EditAdPage;
