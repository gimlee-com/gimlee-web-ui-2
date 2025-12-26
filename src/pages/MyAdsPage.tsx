import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adService } from '../services/adService';
import type { AdPreviewDto } from '../types/api';
import { Heading } from '../components/uikit/Heading/Heading';
import { Spinner } from '../components/uikit/Spinner/Spinner';
import { Button } from '../components/uikit/Button/Button';
import { Table } from '../components/uikit/Table/Table';
import { Label } from '../components/uikit/Label/Label';

const MyAdsPage: React.FC = () => {
  const [ads, setAds] = useState<AdPreviewDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    adService.getMyAds()
      .then(response => setAds(response.content))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateAd = async () => {
    const title = prompt('Enter a title for your new ad:');
    if (title) {
      try {
        const newAd = await adService.createAd({ title });
        navigate(`/my-ads/edit/${newAd.id}`);
      } catch (err: any) {
        alert(err.message || 'Failed to create ad');
      }
    }
  };

  const handleActivate = async (id: string) => {
    try {
        await adService.activateAd(id);
        setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status: 'ACTIVE' } : ad));
    } catch (err: any) {
        alert(err.message || 'Failed to activate ad');
    }
  };

  if (loading) {
    return <div className="uk-flex uk-flex-center"><Spinner ratio={2} /></div>;
  }

  return (
    <div>
      <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom">
        <Heading as="h2">My Ads</Heading>
        <Button variant="primary" onClick={handleCreateAd}>Create New Ad</Button>
      </div>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map(ad => (
            <tr key={ad.id}>
              <td>{ad.title}</td>
              <td>{ad.price ? `${ad.price.amount} ${ad.price.currency}` : '-'}</td>
              <td>
                <Label variant={ad.status === 'ACTIVE' ? 'success' : 'warning'}>
                  {ad.status}
                </Label>
              </td>
              <td>
                <div className="uk-button-group">
                  <Link to={`/my-ads/edit/${ad.id}`} className="uk-button uk-button-default uk-button-small">Edit</Link>
                  {ad.status === 'INACTIVE' && (
                    <Button size="small" variant="primary" onClick={() => handleActivate(ad.id)}>Activate</Button>
                  )}
                  <Link to={`/ads/${ad.id}`} className="uk-button uk-button-text uk-button-small uk-margin-small-left">View</Link>
                </div>
              </td>
            </tr>
          ))}
          {ads.length === 0 && (
            <tr>
              <td colSpan={4} className="uk-text-center">You have no ads yet.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default MyAdsPage;
