import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adService } from '../services/adService';
import { apiClient } from '../services/apiClient';
import { cityService } from '../services/cityService';
import type { AdDetailsDto, UpdateAdRequestDto, CitySuggestion } from '../types/api';
import { Heading } from '../components/uikit/Heading/Heading';
import { Spinner } from '../components/uikit/Spinner/Spinner';
import { Button } from '../components/uikit/Button/Button';
import { Alert } from '../components/uikit/Alert/Alert';

const API_URL = import.meta.env.VITE_API_URL || '';

const EditAdPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<UpdateAdRequestDto>();
  const [ad, setAd] = useState<AdDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaPaths, setMediaPaths] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [selectedCity, setSelectedCity] = useState<CitySuggestion | null>(null);

  useEffect(() => {
    if (id) {
      adService.getAdById(id)
        .then(data => {
          setAd(data);
          setMediaPaths(data.mediaPaths || []);
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
            mediaPaths: data.mediaPaths
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id, reset]);

  const handleCitySearch = async (val: string) => {
    setCitySearch(val);
    if (val.length > 2) {
      const suggestions = await cityService.getSuggestions(val);
      setCitySuggestions(suggestions);
    } else {
      setCitySuggestions([]);
    }
  };

  const selectCity = (city: CitySuggestion) => {
    setSelectedCity(city);
    setCitySearch(`${city.name}, ${city.country}`);
    setCitySuggestions([]);
  };

  const onSubmit = async (data: UpdateAdRequestDto) => {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const updateData = {
          ...data,
          mediaPaths,
          location: selectedCity ? { cityId: selectedCity.id } : undefined
      };
      await adService.updateAd(id, updateData);
      navigate('/my-ads');
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
        const response = await apiClient.post<{ paths: string[] }>('/media/upload', formData);
        setMediaPaths(prev => [...prev, ...response.paths]);
    } catch (err: any) {
        setError(err.message || 'Upload failed');
    }
  };

  if (loading) return <div className="uk-flex uk-flex-center"><Spinner ratio={2} /></div>;
  if (!ad) return <div>Ad not found.</div>;

  return (
    <div>
      <Heading as="h2">Edit Ad: {ad.title}</Heading>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="uk-margin">
          <label className="uk-form-label">Title</label>
          <input {...register('title')} className="uk-input" type="text" />
        </div>

        <div className="uk-margin">
          <label className="uk-form-label">Description</label>
          <textarea {...register('description')} className="uk-textarea" rows={5}></textarea>
        </div>

        <div className="uk-margin">
          <label className="uk-form-label">City</label>
          <div className="uk-inline uk-width-1-1">
            <input
              className="uk-input"
              type="text"
              placeholder="Search for a city..."
              value={citySearch}
              onChange={(e) => handleCitySearch(e.target.value)}
            />
            {citySuggestions.length > 0 && (
              <div className="uk-dropdown uk-show uk-width-1-1" style={{ position: 'relative' }}>
                <ul className="uk-nav uk-dropdown-nav">
                  {citySuggestions.map(city => (
                    <li key={city.id}>
                      <a href="#" onClick={(e) => { e.preventDefault(); selectCity(city); }}>
                        {city.name}, {city.country}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="uk-grid-small" uk-grid="">
          <div className="uk-width-1-2">
            <label className="uk-form-label">Price</label>
            <input {...register('price')} className="uk-input" type="number" step="0.01" />
          </div>
          <div className="uk-width-1-2">
            <label className="uk-form-label">Currency</label>
            <select {...register('currency')} className="uk-select">
              <option value="USD">USD</option>
              <option value="ARRR">ARRR (Pirate Chain)</option>
            </select>
          </div>
        </div>

        <div className="uk-margin">
          <label className="uk-form-label">Media</label>
          <div className="uk-placeholder uk-text-center">
            <span uk-icon="icon: cloud-upload"></span>
            <span className="uk-text-middle uk-margin-small-left">Upload files by </span>
            <div uk-form-custom="">
              <input type="file" multiple onChange={(e) => e.target.files && handleUpload(e.target.files)} />
              <span className="uk-link">selecting them</span>
            </div>
          </div>
          <div className="uk-grid-small uk-child-width-1-4 uk-margin-top" uk-grid="">
            {mediaPaths.map((path, index) => (
              <div key={index} className="uk-inline">
                <img src={`${API_URL}/api/media?p=${path}`} alt="media" className="uk-border-rounded" />
                <div className="uk-position-top-right uk-overlay uk-overlay-default uk-padding-small">
                    <button type="button" className="uk-close" onClick={() => setMediaPaths(prev => prev.filter(p => p !== path))}></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="uk-margin-large-top">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" className="uk-margin-left" onClick={() => navigate('/my-ads')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default EditAdPage;
