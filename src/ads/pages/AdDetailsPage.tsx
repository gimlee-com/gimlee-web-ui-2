import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { adService } from '../services/adService';
import { purchaseService } from '../services/purchaseService';
import { PurchaseModal } from '../components/PurchaseModal';
import type { AdDetailsDto, PurchaseResponseDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Grid } from '../../components/uikit/Grid/Grid';
import { Button } from '../../components/uikit/Button/Button';
import { Card, CardBody } from '../../components/uikit/Card/Card';
import { Lightbox, LightboxItem } from '../../components/uikit/Lightbox/Lightbox';
import { Slider, SliderContainer, SliderItem } from '../../components/uikit/Slider/Slider';
import { Thumbnav } from '../../components/uikit/Thumbnav/Thumbnav';
import { Slidenav } from '../../components/uikit/Slidenav/Slidenav';
import styles from './AdDetailsPage.module.scss';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [ad, setAd] = useState<AdDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLightboxThumbnav, setShowLightboxThumbnav] = useState(window.innerWidth >= 960);
  const [quantity, setQuantity] = useState(1);
  const [activePurchase, setActivePurchase] = useState<PurchaseResponseDto | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('activePurchase');
    if (stored) {
      try {
        setActivePurchase(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('activePurchase');
      }
    }
  }, []);

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/ads/${id}` } });
      return;
    }

    if (!ad || !ad.price) return;

    setIsPurchasing(true);
    try {
      const response = await purchaseService.createPurchase({
        currency: 'ARRR',
        items: [
          {
            adId: ad.id,
            quantity: quantity,
            unitPrice: ad.price.amount
          }
        ]
      });
      setActivePurchase(response);
      localStorage.setItem('activePurchase', JSON.stringify(response));
    } catch (error) {
      console.error('Failed to create purchase', error);
      alert(t('auth.errors.generic'));
    } finally {
      setIsPurchasing(false);
    }
  };

  const handlePurchaseModalClose = () => {
    // If the purchase is no longer awaiting payment, we can clear it from localStorage
    if (activePurchase && activePurchase.status !== 'AWAITING_PAYMENT') {
      localStorage.removeItem('activePurchase');
    }
    setActivePurchase(null);
  };

  const handlePurchaseStatusChange = (status: any) => {
    if (activePurchase) {
      const updatedPurchase = { ...activePurchase, status };
      setActivePurchase(updatedPurchase);
      if (status === 'AWAITING_PAYMENT') {
        localStorage.setItem('activePurchase', JSON.stringify(updatedPurchase));
      } else {
        localStorage.removeItem('activePurchase');
      }
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 960px)');
    const handler = (e: MediaQueryListEvent) => setShowLightboxThumbnav(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (id) {
      adService.getAdById(id)
        .then(setAd)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="uk-flex uk-flex-center"><Spinner ratio={2} /></div>;
  }

  if (!ad) {
    return <div>{t('ads.notFound')}</div>;
  }

  const images = ad.mediaPaths?.map(path => {
    const hasLeadingSlash = path.startsWith('/');
    const thumbMdPath = hasLeadingSlash ? `/thumbs-md${path}` : `/thumbs-md/${path}`;
    const thumbXsPath = hasLeadingSlash ? `/thumbs-xs${path}` : `/thumbs-xs/${path}`;

    return {
      original: `${API_URL}/api/media?p=${path}`,
      thumbMd: `${API_URL}/api/media?p=${thumbMdPath}`,
      thumbXs: `${API_URL}/api/media?p=${thumbXsPath}`,
      alt: ad.title
    };
  }) || [];

  return (
    <div>
      <Grid gap="large">
        <div className="uk-width-2-3@m">
          {images.length > 0 ? (
            <>
              <Lightbox nav={showLightboxThumbnav ? 'thumbnav' : undefined}>
                <div className="uk-margin-bottom">
                  {images.map((img, index) => (
                    <div key={index} className={index === activeIndex ? '' : 'uk-hidden'}>
                      <LightboxItem href={img.original} caption={img.alt} thumb={img.thumbXs}>
                        <img
                          src={img.thumbMd}
                          alt={img.alt}
                          className={`uk-border-rounded uk-width-1-1 uk-background-muted uk-object-cover ${styles.adDetailsLightboxImage}`}
                        />
                      </LightboxItem>
                    </div>
                  ))}
                </div>
              </Lightbox>

              {images.length > 1 && (
                <div className="uk-position-relative uk-visible-toggle" tabIndex={-1}>
                  <Slider finite>
                    <SliderContainer>
                      <Thumbnav className="uk-slider-items uk-flex-nowrap">
                        {images.map((img, index) => (
                          <SliderItem key={index} className={index === activeIndex ? 'uk-active' : ''}>
                            <a 
                              href="#" 
                              onClick={(e) => { e.preventDefault(); setActiveIndex(index); }}
                              className={`uk-display-block ${styles.adDetailsThumbLink}`}
                            >
                              <img
                                src={img.thumbXs}
                                alt=""
                                className="uk-border-rounded uk-width-1-1 uk-height-1-1 uk-object-cover"
                              />
                            </a>
                          </SliderItem>
                        ))}
                      </Thumbnav>
                    </SliderContainer>
                    
                    <Slidenav
                      type="previous"
                      className="uk-position-center-left uk-position-small uk-hidden-hover"
                      uk-slider-item="previous"
                    />
                    <Slidenav
                      type="next"
                      className="uk-position-center-right uk-position-small uk-hidden-hover"
                      uk-slider-item="next"
                    />
                  </Slider>
                </div>
              )}
            </>
          ) : (
            <div className="uk-width-1-1">
              <img
                src="/placeholder-image.svg"
                alt={ad.title}
                className={`uk-border-rounded uk-width-1-1 uk-background-muted uk-object-cover ${styles.adDetailsLightboxImage}`}
                style={{ cursor: 'default' }}
              />
            </div>
          )}
        </div>
        <div className="uk-width-1-3@m">
          <Heading as="h2">{ad.title}</Heading>
          {ad.price && (
            <p className="uk-text-large uk-text-primary uk-text-bold">
              {ad.price.amount} {ad.price.currency}
            </p>
          )}
          <hr />
          <div className="uk-margin">
            <Heading as="h4">{t('ads.description')}</Heading>
            <p className="uk-text-break">{ad.description || t('ads.noDescription')}</p>
          </div>
          {ad.location?.city && (
            <div className="uk-margin">
              <Heading as="h4">{t('ads.location')}</Heading>
              <p>{ad.location.city.name}, {ad.location.city.country}</p>
            </div>
          )}
          <hr />
          <Card className="uk-margin-medium-top uk-border-rounded">
            <CardBody>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="quantity">{t('purchases.quantity')}</label>
                <div className="uk-form-controls">
                  <input 
                    className="uk-input uk-form-width-small" 
                    id="quantity" 
                    type="number" 
                    min="1" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              <Button 
                variant="primary" 
                className="uk-width-1-1" 
                onClick={handleBuyNow}
                disabled={isPurchasing || ad.status === 'SOLD'}
              >
                {isPurchasing ? <Spinner ratio={0.8} /> : t('purchases.buyNow')}
              </Button>
              {activePurchase && (
                <div className="uk-margin-small-top">
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setActivePurchase({ ...activePurchase }); }}
                    className="uk-text-small"
                  >
                    {t('purchases.storedPurchaseFound')}
                  </a>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </Grid>
      {activePurchase && (
        <PurchaseModal 
          purchase={activePurchase} 
          onClose={handlePurchaseModalClose}
          onStatusChange={handlePurchaseStatusChange}
        />
      )}
    </div>
  );
};

export default AdDetailsPage;
