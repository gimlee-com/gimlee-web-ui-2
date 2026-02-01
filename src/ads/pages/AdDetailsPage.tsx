import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
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
import { Label } from '../../components/uikit/Label/Label';
import { Icon } from '../../components/uikit/Icon/Icon';
import { useNavbarMode } from '../../hooks/useNavbarMode';
import NavbarPortal from '../../components/Navbar/NavbarPortal';
import { formatPrice } from '../../utils/currencyUtils';
import { formatRelativeTime } from '../../utils/dateUtils';
import { Markdown } from '../../components/Markdown/Markdown';
import { Image } from '../../components/Image/Image';
import { AvatarWithPresence } from '../../components/AvatarWithPresence';
import { AdCard } from '../components/AdCard';
import styles from './AdDetailsPage.module.scss';

const API_URL = import.meta.env.VITE_API_URL || '';

interface UIkitSliderInstance extends UIkit.UIkitSliderElement {
  index: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
} as const;

const enrichAdWithMocks = (ad: AdDetailsDto): AdDetailsDto => {
  return {
    ...ad,
    condition: ad.condition || 'LIKE_NEW',
    stats: ad.stats || {
      viewsCount: 128,
      favoritesCount: 14,
      lastPurchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
    },
    shipping: ad.shipping || {
      methods: ['Digital Delivery', 'International Shipping'],
      estimatedDelivery: '3-5 business days',
      origin: ad.location?.city?.name || 'Worldwide'
    },
    attributes: ad.attributes || [
      { label: 'Color', value: 'Midnight Blue' },
      { label: 'Material', value: 'Recycled Aluminum' }
    ],
    isFavorite: ad.isFavorite !== undefined ? ad.isFavorite : false,
    userCanPurchase: ad.userCanPurchase !== undefined ? ad.userCanPurchase : true,
    user: ad.user
  };
};

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
        .then(data => setAd(enrichAdWithMocks(data)))
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
          <motion.div variants={itemVariants}>
            {images.length > 0 ? (
              <>
                <Lightbox nav={showLightboxThumbnav ? 'thumbnav' : undefined}>
                  <Slider ref={mainSliderRef}>
                    <SliderContainer className="uk-margin-bottom">
                      <SliderItems className="uk-child-width-1-1">
                        {images.map((img, index) => (
                          <SliderItem key={index} data-index={index}>
                            <LightboxItem href={img.original} caption={img.alt} thumb={img.thumbXs}>
                              <Image
                                src={visitedIndices.includes(index) ? img.thumbMd : img.thumbXs}
                                alt={img.alt}
                                className={`uk-border-rounded uk-width-1-1 uk-background-muted uk-object-cover ${styles.adDetailsLightboxImage}`}
                                containerClassName={`uk-border-rounded uk-width-1-1 uk-background-muted uk-object-cover ${styles.adDetailsLightboxImage}`}
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
                                <Image
                                  src={img.thumbXs}
                                  alt=""
                                  className="uk-border-rounded uk-width-1-1 uk-height-1-1 uk-object-cover"
                                  containerClassName="uk-border-rounded uk-width-1-1 uk-height-1-1"
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
                <Image
                  src="/placeholder-image.svg"
                  alt={ad.title}
                  className={`uk-border-rounded uk-width-1-1 uk-background-muted uk-object-cover ${styles.adDetailsLightboxImage}`}
                  containerClassName={`uk-border-rounded uk-width-1-1 uk-background-muted uk-object-cover ${styles.adDetailsLightboxImage}`}
                  containerStyle={{ cursor: 'default' }}
                />
                <p className="uk-text-muted uk-margin-small-top">{t('ads.noImages')}</p>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="uk-margin-large-top">
            <Heading as="h4" divider>{t('ads.description')}</Heading>
            <div className="uk-margin">
              {ad.description ? (
                <Markdown content={ad.description} className="uk-text-break" />
              ) : (
                <p className="uk-text-muted">{t('ads.noDescription')}</p>
              )}
            </div>
          </motion.div>

          {ad.attributes && ad.attributes.length > 0 && (
            <motion.div variants={itemVariants} className="uk-margin-large-top">
              <Heading as="h4" divider>{t('adDetails.specs')}</Heading>
              <div className="uk-margin">
                {ad.attributes.map((attr, idx) => (
                  <div key={idx} className={styles.specRow}>
                    <span className={styles.specLabel}>{attr.label}</span>
                    <span className={styles.specValue}>{attr.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {ad.otherAds && ad.otherAds.length > 0 && (
            <motion.div variants={itemVariants} className="uk-margin-large-top">
              <Heading as="h4" divider>{t('adDetails.otherAds')}</Heading>
              <div className="uk-margin">
                <Grid
                    className="uk-child-width-1-2 uk-child-width-1-4@s"
                    gap="small"
                >
                  {ad.otherAds.slice(0, 4).map((otherAd) => (
                    <div key={otherAd.id}>
                      <AdCard ad={otherAd} />
                    </div>
                  ))}
                </Grid>
                {ad.user && (
                  <div className="uk-margin-top uk-text-center">
                    <Link 
                      to={`/u/${ad.user.username}`} 
                      className="uk-button uk-button-default uk-border-rounded"
                    >
                      {t('adDetails.viewAll')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="uk-margin-large-top">
            <Heading as="h4" divider>{t('adDetails.questions')}</Heading>
            <div className="uk-text-center uk-padding-large uk-background-muted uk-border-rounded">
              <Icon icon="question" ratio={2} className="uk-text-muted uk-margin-small-bottom" />
              <p className="uk-text-muted">{t('adDetails.noQuestions')}</p>
              <Button variant="default" className="uk-margin-small-top">
                {t('adDetails.askQuestion')}
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="uk-width-1-3@m">
          <motion.div variants={itemVariants}>
            <Card className="uk-border-rounded uk-box-shadow-medium">
              <CardBody>
                <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                  {ad.condition && (
                    <Label variant="default">{t(`ads.conditions.${ad.condition}`)}</Label>
                  )}
                  <div className={styles.actionButtons}>
                    <button 
                      className={`uk-icon-button ${styles.actionButton} ${ad.isFavorite ? styles.isFavorite : ''}`}
                      title={t('adDetails.favorites')}
                    >
                      <Icon icon="heart" className={ad.isFavorite ? 'uk-text-danger' : ''} />
                    </button>
                    <button 
                      className={`uk-icon-button ${styles.actionButton}`}
                      title={t('common.actions')}
                    >
                      <Icon icon="more-vertical" />
                    </button>
                  </div>
                </div>

                <Heading as="h2" className="uk-margin-remove-top uk-margin-small-bottom">{ad.title}</Heading>
                
                <div className="uk-margin-small-bottom">
                  {ad.preferredPrice ? (
                    <div className="uk-flex uk-flex-middle">
                      <span className="uk-text-large uk-text-primary uk-text-bold">
                        {formatPrice(ad.preferredPrice.amount, ad.preferredPrice.currency)}
                      </span>
                      {ad.price && (
                        <span className="uk-text-meta uk-margin-small-left">
                          ({formatPrice(ad.price.amount, ad.price.currency)})
                        </span>
                      )}
                    </div>
                  ) : ad.price && (
                    <span className="uk-text-large uk-text-primary uk-text-bold">
                      {formatPrice(ad.price.amount, ad.price.currency)}
                    </span>
                  )}
                </div>

                <hr className="uk-margin-small" />

                <div className="uk-margin-small">
                  <label className="uk-form-label uk-text-small" htmlFor="quantity">{t('purchases.quantity')}</label>
                  <Grid gap="small" className="uk-form-controls uk-flex-middle uk-margin-small-top">
                    <div>
                      <input 
                        className="uk-input uk-form-width-xsmall uk-form-small uk-border-rounded" 
                        id="quantity" 
                        type="number" 
                        min="1" 
                        max={ad.availableStock}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div>
                      <span className="uk-text-meta">
                        {t('ads.onlyLeft', { count: ad.availableStock || 0 })}
                      </span>
                    </div>
                  </Grid>
                </div>

                <Button 
                  variant="primary" 
                  className="uk-width-1-1 uk-margin-small-top uk-border-rounded" 
                  onClick={handleBuyNow}
                  disabled={isPurchasing || ad.status === 'SOLD' || !!activePurchase || !ad.userCanPurchase}
                >
                  {isPurchasing ? <Spinner ratio={0.8} /> : t('purchases.buyNow')}
                </Button>

                {!ad.userCanPurchase && (
                  <div className="uk-alert-danger uk-padding-small uk-border-rounded uk-margin-small-top">
                    <p className="uk-text-small uk-margin-remove">
                      {t('ads.notEligibleTitle')}
                    </p>
                  </div>
                )}

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
          </motion.div>

          {ad.user && (
            <motion.div variants={itemVariants} className="uk-margin-medium-top">
              <Link to={`/u/${ad.user.username}`} className="uk-link-reset uk-display-block">
                <Card className={`uk-border-rounded ${styles.sellerCard}`}>
                  <CardBody>
                    <Heading as="h4" className="uk-margin-small-bottom">{t('adDetails.seller')}</Heading>
                    <Grid gap="small" className="uk-flex-middle">
                      <div className="uk-width-auto">
                        <AvatarWithPresence 
                          username={ad.user.username} 
                          avatarUrl={ad.user.avatarUrl} 
                          status={ad.user.presence?.status}
                          size={50}
                        />
                      </div>
                      <div className="uk-width-expand">
                        <div className="uk-flex uk-flex-column">
                          <div className="uk-text-bold">{ad.user.username}</div>
                          <Grid gap="small" className="uk-text-meta uk-flex-middle uk-child-width-auto">
                            <div>
                              <span className="uk-text-warning"><Icon icon="star" ratio={0.8} /> 4.9</span>
                            </div>
                            <div>
                              <span>(128 {t('adDetails.questions')})</span>
                            </div>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <div className="uk-margin-small-top">
                      <div className="uk-text-meta uk-margin-xsmall-bottom">
                        {t('adDetails.memberSince', { date: ad.user.memberSince ? formatRelativeTime(ad.user.memberSince) : '2024' })}
                      </div>
                      <Label variant="success" className="uk-text-small">
                        <Icon icon="check" ratio={0.7} className="uk-margin-xsmall-right" />
                        {t('adDetails.verified')}
                      </Label>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="uk-margin-medium-top">
            <Card className="uk-border-rounded">
              <CardBody>
                <Heading as="h4" className="uk-margin-small-bottom">{t('adDetails.popularity')}</Heading>
                <Grid gap="small" className="uk-child-width-1-1">
                  <div>
                    <div className={styles.statItem}>
                      <Icon icon="history" />
                      <span>{t('adDetails.views', { count: ad.stats?.viewsCount })}</span>
                    </div>
                  </div>
                  <div>
                    <div className={styles.statItem}>
                      <Icon icon="heart" />
                      <span>{t('adDetails.favorites', { count: ad.stats?.favoritesCount })}</span>
                    </div>
                  </div>
                  {ad.stats?.lastPurchasedAt && (
                    <div>
                      <div className="uk-alert-primary uk-padding-xsmall uk-border-rounded uk-margin-remove-bottom">
                        <p className="uk-text-xsmall uk-margin-remove">
                          <Icon icon="cart" ratio={0.8} className="uk-margin-xsmall-right" />
                          5 people bought this in the last 24h
                        </p>
                      </div>
                    </div>
                  )}
                </Grid>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="uk-margin-medium-top">
            <Card className="uk-border-rounded">
              <CardBody>
                <Heading as="h4" className="uk-margin-small-bottom">{t('adDetails.shipping')}</Heading>
                {ad.location?.city && (
                  <Grid gap="small" className="uk-flex-middle uk-margin-small-bottom">
                    <div className="uk-width-auto">
                      <Icon icon="location" className="uk-text-primary" />
                    </div>
                    <div className="uk-width-expand">
                      <span>{ad.location.city.name}{ad.location.city.district ? `, ${ad.location.city.district}` : ''}, {ad.location.city.country}</span>
                    </div>
                  </Grid>
                )}
                <div className={styles.shippingInfo}>
                  <Grid gap="small" className="uk-flex-middle uk-margin-small-bottom">
                    <div className="uk-width-auto">
                      <Icon icon="receiver" />
                    </div>
                    <div className="uk-width-expand">
                      <span>{ad.shipping?.methods.join(', ')}</span>
                    </div>
                  </Grid>
                  <div className="uk-text-small uk-text-bold uk-text-success">
                    {t('adDetails.deliveryEstimate', { estimate: ad.shipping?.estimatedDelivery })}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </Grid>
    </motion.div>
  );
};

export default AdDetailsPage;
