import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UIkit from 'uikit';
import { useAuth } from '../../context/AuthContext';
import { adService } from '../services/adService';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActivePurchase, setModalOpen } from '../../store/purchaseSlice';
import { purchaseService } from '../../purchases/services/purchaseService';
import type { AdDetailsDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Grid } from '../../components/uikit/Grid/Grid';
import { Button } from '../../components/uikit/Button/Button';
import { Alert } from '../../components/uikit/Alert/Alert';
import { Card, CardBody } from '../../components/uikit/Card/Card';
import { Lightbox, LightboxItem } from '../../components/uikit/Lightbox/Lightbox';
import { Slider, SliderContainer, SliderItem, SliderItems } from '../../components/uikit/Slider/Slider';
import { Thumbnav } from '../../components/uikit/Thumbnav/Thumbnav';
import { Slidenav } from '../../components/uikit/Slidenav/Slidenav';
import { Breadcrumb, BreadcrumbItem } from '../../components/uikit/Breadcrumb/Breadcrumb';
import { useNavbarMode } from '../../hooks/useNavbarMode';
import NavbarPortal from '../../components/Navbar/NavbarPortal';
import { formatPrice } from '../../utils/currencyUtils';
import styles from './AdDetailsPage.module.scss';

const API_URL = import.meta.env.VITE_API_URL || '';

interface UIkitSliderInstance extends UIkit.UIkitSliderElement {
  index: number;
}

const AdDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [ad, setAd] = useState<AdDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visitedIndices, setVisitedIndices] = useState<number[]>([0]);
  const [showLightboxThumbnav, setShowLightboxThumbnav] = useState(window.innerWidth >= 960);
  const [quantity, setQuantity] = useState(1);
  const activePurchase = useAppSelector(state => state.purchase.activePurchase);
  const dispatch = useAppDispatch();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const mainSliderRef = useRef<HTMLDivElement>(null);
  const thumbSliderRef = useRef<HTMLDivElement>(null);

  useNavbarMode('focused', '/ads');

  const activeIndexRef = useRef(activeIndex);
  const targetIndexRef = useRef<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
    setVisitedIndices([0]);
  }, [id]);

  useEffect(() => {
    setVisitedIndices(prev => {
      if (prev.includes(activeIndex)) return prev;
      return [...prev, activeIndex];
    });
  }, [activeIndex]);

  useEffect(() => {
    if (mainSliderRef.current) {
      const instance = UIkit.slider(mainSliderRef.current) as unknown as UIkitSliderInstance;
      if (instance && instance.index !== activeIndex) {
        targetIndexRef.current = activeIndex;
        instance.show(activeIndex);
      }
    }
    if (thumbSliderRef.current) {
      const instance = UIkit.slider(thumbSliderRef.current) as unknown as UIkitSliderInstance;
      if (instance && instance.index !== activeIndex) {
        instance.show(activeIndex);
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const el = mainSliderRef.current;
    if (!el) return;

    const handleItemShow = (e: Event) => {
      const target = e.target as HTMLElement;
      // Use data-index to robustly identify the item, even if cloned by infinite slider
      const item = target.closest('[data-index]');
      if (item) {
        const indexStr = item.getAttribute('data-index');
        if (indexStr !== null) {
          const index = parseInt(indexStr, 10);
          
          if (targetIndexRef.current !== null) {
            if (index === targetIndexRef.current) {
              targetIndexRef.current = null;
            } else {
              // Ignore intermediate slides during programmatic jump
              return;
            }
          }

          const currentActive = activeIndexRef.current;
          
          if (!isNaN(index) && index !== currentActive) {
            setActiveIndex(index);
          }
        }
      }
    };

    el.addEventListener('itemshow', handleItemShow);
    return () => el.removeEventListener('itemshow', handleItemShow);
  }, [ad, loading]); // Depend on ad and loading to ensure listener is attached when slider is rendered


  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: `/ads/${id}`, 
          backContext: location.state?.from 
        } 
      });
      return;
    }

    if (!ad || !ad.price) return;

    setIsPurchasing(true);
    try {
      const response = await purchaseService.createPurchase({
        currency: ad.price.currency,
        items: [
          {
            adId: ad.id,
            quantity: quantity,
            unitPrice: ad.price.amount
          }
        ]
      });
      // Ensure currency is set in response even if backend didn't (though it should)
      if (!response.currency) {
        response.currency = ad.price.currency;
      }
      dispatch(setActivePurchase(response));
    } catch (error: any) {
      console.error('Failed to create purchase', error);
      UIkit.modal.alert(error.message || t('auth.errors.generic'));
    } finally {
      setIsPurchasing(false);
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
      const controller = new AbortController();
      setLoading(true);
      setError(null);
      adService.getAdById(id, { signal: controller.signal })
        .then(setAd)
        .catch(err => {
          if (err.name !== 'AbortError') {
            setError(err.message || t('auth.errors.generic'));
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });

      return () => controller.abort();
    }
  }, [id, t]);

  if (loading) {
    return <div className="uk-flex uk-flex-center"><Spinner ratio={2} /></div>;
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
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
      <NavbarPortal>
        <div className="uk-flex uk-flex-column uk-width-1-1" style={{ minWidth: 0 }}>
          <Heading as="h5" className="uk-margin-remove uk-text-truncate">
            {ad.title}
          </Heading>
          {ad.categoryPath && ad.categoryPath.length > 0 && (
            <div className={styles.breadcrumbWrapper}>
              <Breadcrumb className="uk-margin-remove">
                {ad.categoryPath.map((cat) => (
                  <BreadcrumbItem key={cat.id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/ads?cat=${cat.id}`);
                      }}
                      className="uk-text-meta"
                    >
                      {cat.name}
                    </a>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </div>
          )}
        </div>
      </NavbarPortal>
      <Grid gap="large">
        <div className="uk-width-2-3@m">
          {images.length > 0 ? (
            <>
              <Lightbox nav={showLightboxThumbnav ? 'thumbnav' : undefined}>
                <Slider ref={mainSliderRef}>
                  <SliderContainer className="uk-margin-bottom">
                    <SliderItems className="uk-child-width-1-1">
                      {images.map((img, index) => (
                        <SliderItem key={index} data-index={index}>
                          <LightboxItem href={img.original} caption={img.alt} thumb={img.thumbXs}>
                            <img
                              src={visitedIndices.includes(index) ? img.thumbMd : img.thumbXs}
                              alt={img.alt}
                              className={`uk-border-rounded uk-width-1-1 uk-background-muted uk-object-cover ${styles.adDetailsLightboxImage}`}
                            />
                          </LightboxItem>
                        </SliderItem>
                      ))}
                    </SliderItems>
                  </SliderContainer>
                </Slider>
              </Lightbox>

              {images.length > 1 && (
                <div className="uk-position-relative uk-visible-toggle" tabIndex={-1}>
                  <Slider finite ref={thumbSliderRef}>
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
            <div className="uk-width-1-1 uk-text-center">
              <img
                src="/placeholder-image.svg"
                alt={ad.title}
                className={`uk-border-rounded uk-width-1-1 uk-background-muted uk-object-cover ${styles.adDetailsLightboxImage}`}
                style={{ cursor: 'default' }}
              />
              <p className="uk-text-muted uk-margin-small-top">{t('ads.noImages')}</p>
            </div>
          )}
        </div>
        <div className="uk-width-1-3@m">
          <Heading as="h2">{ad.title}</Heading>
          {ad.preferredPrice ? (
            <p className="uk-text-large uk-text-primary uk-text-bold">
              {formatPrice(ad.preferredPrice.amount, ad.preferredPrice.currency)}
              {ad.price && (
                <span className="uk-text-meta uk-margin-small-left" style={{ fontWeight: 'normal' }}>
                  ({formatPrice(ad.price.amount, ad.price.currency)})
                </span>
              )}
            </p>
          ) : ad.price && (
            <p className="uk-text-large uk-text-primary uk-text-bold">
              {formatPrice(ad.price.amount, ad.price.currency)}
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
              <p>{ad.location.city.name}{ad.location.city.district ? ` (${ad.location.city.district})` : ''}, {ad.location.city.country}</p>
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
                disabled={isPurchasing || ad.status === 'SOLD' || !!activePurchase}
              >
                {isPurchasing ? <Spinner ratio={0.8} /> : t('purchases.buyNow')}
              </Button>
              {activePurchase && (
                <div className="uk-margin-small-top">
                  <div className="uk-alert-warning uk-padding-small uk-border-rounded uk-margin-small-bottom">
                    <p className="uk-text-small uk-margin-remove">
                      {t('purchases.pendingPurchaseExists')}
                    </p>
                  </div>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); dispatch(setModalOpen(true)); }}
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
    </div>
  );
};

export default AdDetailsPage;
