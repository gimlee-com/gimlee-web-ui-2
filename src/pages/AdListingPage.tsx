import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { adService } from '../services/adService';
import type { PageAdPreviewDto } from '../types/api';
import { AdCard } from '../components/ads/AdCard';
import { Grid } from '../components/uikit/Grid/Grid';
import { Heading } from '../components/uikit/Heading/Heading';
import { Spinner } from '../components/uikit/Spinner/Spinner';
import { Pagination as UkPagination, PaginationItem, PaginationPrevious, PaginationNext } from '../components/uikit/Pagination/Pagination';

const AdListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<PageAdPreviewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(searchParams.get('t') || '');

  useEffect(() => {
    setLoading(true);
    const params = Object.fromEntries(searchParams.entries());
    adService.searchAds(params)
      .then(setData)
      .finally(() => setLoading(false));
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ t: searchText, p: '0' });
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('p', page.toString());
    setSearchParams(newParams);
  };

  const renderPagination = () => {
    if (!data || data.totalPages <= 1) return null;
    
    const pages = [];
    for (let i = 0; i < data.totalPages; i++) {
      pages.push(
        <PaginationItem key={i} active={i === data.number}>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }}>{i + 1}</a>
        </PaginationItem>
      );
    }
    
    return (
      <UkPagination className="uk-flex-center">
        <PaginationItem disabled={data.number === 0}>
          <a href="#" onClick={(e) => { e.preventDefault(); if (data.number > 0) handlePageChange(data.number - 1); }}>
            <PaginationPrevious />
          </a>
        </PaginationItem>
        {pages}
        <PaginationItem disabled={data.number === data.totalPages - 1}>
          <a href="#" onClick={(e) => { e.preventDefault(); if (data.number < data.totalPages - 1) handlePageChange(data.number + 1); }}>
            <PaginationNext />
          </a>
        </PaginationItem>
      </UkPagination>
    );
  };

  return (
    <div>
      <Heading as="h2">Browse Ads</Heading>
      
      <form onSubmit={handleSearch} className="uk-margin-medium-bottom">
        <div className="uk-inline uk-width-1-1">
          <span className="uk-form-icon" uk-icon="icon: search"></span>
          <input
            className="uk-input"
            type="text"
            placeholder="Search ads..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </form>

      {loading ? (
        <div className="uk-flex uk-flex-center">
          <Spinner ratio={2} />
        </div>
      ) : (
        <>
          <Grid gap="small" match className="uk-child-width-1-2@s uk-child-width-1-4@m">
            {data?.content.map(ad => (
              <div key={ad.id}>
                <AdCard ad={ad} />
              </div>
            ))}
          </Grid>
          
          <div className="uk-margin-large-top">
            {renderPagination()}
          </div>
          
          {data?.content.length === 0 && (
            <div className="uk-text-center uk-margin-large-top">
              <p>No ads found matching your search.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdListingPage;
