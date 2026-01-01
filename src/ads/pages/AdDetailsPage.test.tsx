import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdDetailsPage from './AdDetailsPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { adService } from '../services/adService';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import styles from './AdDetailsPage.module.scss';

vi.mock('../services/adService', () => ({
  adService: {
    getAdById: vi.fn(),
  },
}));

const mockAd = {
  id: '1',
  title: 'Test Ad',
  description: 'Test Description',
  price: { amount: 100, currency: 'USD' },
  mediaPaths: ['image1.jpg', 'image2.jpg'],
  location: { city: { name: 'Test City', country: 'Test Country' } },
};

const renderAdDetailsPage = (id = '1') => {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[`/ads/${id}`]}>
        <Routes>
          <Route path="/ads/:id" element={<AdDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </I18nextProvider>
  );
};

describe('AdDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render ad details', async () => {
    (adService.getAdById as any).mockResolvedValue(mockAd);

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText('Test Ad')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('100 USD')).toBeInTheDocument();
      expect(screen.getByText('Test City, Test Country')).toBeInTheDocument();
    });
  });

  it('should change active image when thumbnail is clicked', async () => {
    (adService.getAdById as any).mockResolvedValue(mockAd);

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText('Test Ad')).toBeInTheDocument();
    });

    // Note: The first thumbnail link is thumbnails[1] because the first image is also wrapped in a link (LightboxItem)
    // Wait, let's check how many links we have.
    // 2 images * (1 LightboxItem + 1 Thumbnav link) = 4 links.
    
    // Initial state: first image is visible, second is hidden
    const mainImages = screen.getAllByRole('img').filter(img => (img as HTMLImageElement).src.includes('thumbs-md'));
    expect(mainImages[0].closest('div')).not.toHaveClass('uk-hidden');
    expect(mainImages[1].closest('div')).toHaveClass('uk-hidden');

    // Click the second thumbnail
    // Thumbnails are in Thumbnav, which are links with '#' href and no text, but they contain images with src including 'thumbs-xs'
    const thumbLinks = screen.getAllByRole('link').filter(link => {
        const img = link.querySelector('img') as HTMLImageElement | null;
        return img && img.src.includes('thumbs-xs');
    });

    fireEvent.click(thumbLinks[1]);

    // Now second image should be visible
    expect(mainImages[0].closest('div')).toHaveClass('uk-hidden');
    expect(mainImages[1].closest('div')).not.toHaveClass('uk-hidden');
  });

  it('should have correct styling for the main image', async () => {
    (adService.getAdById as any).mockResolvedValue(mockAd);

    renderAdDetailsPage();

    await waitFor(() => {
      const mainImages = screen.getAllByRole('img').filter(img => (img as HTMLImageElement).src.includes('thumbs-md'));
      expect(mainImages[0]).toHaveClass(styles.adDetailsLightboxImage);
      expect(mainImages[0]).toHaveClass('uk-object-cover');
    });
  });

  it('should show "no images" placeholder if ad has no media', async () => {
    (adService.getAdById as any).mockResolvedValue({ ...mockAd, mediaPaths: [] });

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText(/No images available/i)).toBeInTheDocument();
    });
  });
});
