import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdDetailsPage from './AdDetailsPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { AuthProvider } from '../../context/AuthContext';
import { adService } from '../services/adService';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import styles from './AdDetailsPage.module.scss';
import type { AdDetailsDto } from '../../types/api';

vi.mock('../services/adService', () => ({
  adService: {
    getAdById: vi.fn(),
  },
}));

const mockAd: AdDetailsDto = {
  id: '1',
  title: 'Test Ad',
  description: 'Test Description',
  price: { amount: 100, currency: 'ARRR' },
  mediaPaths: ['image1.jpg', 'image2.jpg'],
  location: { city: { id: 'c1', name: 'Test City', country: 'Test Country' } },
  status: 'ACTIVE'
};

const renderAdDetailsPage = (id = '1') => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <div id="navbar-focused-content"></div>
          <MemoryRouter initialEntries={[`/ads/${id}`]}>
            <Routes>
              <Route path="/ads/:id" element={<AdDetailsPage />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

describe('AdDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render ad details', async () => {
    vi.mocked(adService.getAdById).mockResolvedValue(mockAd);

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText('Test Ad')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText(/ARRR 100\.00/)).toBeInTheDocument();
      expect(screen.getByText('Test City, Test Country')).toBeInTheDocument();
    });
  });

  it('should change active image when thumbnail is clicked', async () => {
    vi.mocked(adService.getAdById).mockResolvedValue(mockAd);

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText('Test Ad')).toBeInTheDocument();
    });

    // Initial state: only first image has thumbs-md due to progressive loading
    const getMdImages = () => screen.getAllByRole('img').filter(img => (img as HTMLImageElement).src.includes('thumbs-md'));
    
    expect(getMdImages()).toHaveLength(1);

    // Click the second thumbnail
    const thumbLinks = screen.getAllByRole('link').filter(link => {
        const img = link.querySelector('img') as HTMLImageElement | null;
        return img && img.src.includes('thumbs-xs');
    });

    fireEvent.click(thumbLinks[1]);

    // Now second image should also have thumbs-md (as it's now visited)
    await waitFor(() => {
      expect(getMdImages()).toHaveLength(2);
    });
  });

  it('should still update active index on swipe after clicking a thumbnail', async () => {
    vi.mocked(adService.getAdById).mockResolvedValue({
        ...mockAd,
        mediaPaths: ['image1.jpg', 'image2.jpg', 'image3.jpg']
    });

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText('Test Ad')).toBeInTheDocument();
    });

    const getMdImages = () => screen.getAllByRole('img').filter(img => (img as HTMLImageElement).src.includes('thumbs-md'));
    
    // 1. Initially 1 high-res image
    expect(getMdImages()).toHaveLength(1);

    // 2. Click second thumbnail
    const thumbLinks = screen.getAllByRole('link').filter(link => {
        const img = link.querySelector('img') as HTMLImageElement | null;
        return img && img.src.includes('thumbs-xs');
    });
    fireEvent.click(thumbLinks[1]);

    await waitFor(() => {
      expect(getMdImages()).toHaveLength(2);
    });

    // Find main slider and items
    const allSliders = document.querySelectorAll('[uk-slider]');
    const mainSlider = Array.from(allSliders).find(s => s.querySelector('a[data-caption]'));
    const sliderItems = mainSlider!.querySelectorAll('li[data-index]');

    // Manually trigger itemshow for index 1 to "complete" the jump in JSDOM
    fireEvent(sliderItems[1], new CustomEvent('itemshow', { bubbles: true }));

    // 3. Simulate swipe to third image (index 2)
    await waitFor(() => {
        fireEvent(sliderItems[2], new CustomEvent('itemshow', { bubbles: true }));
        expect(getMdImages()).toHaveLength(3);
    });
  });

  it('should have correct styling for the main image', async () => {
    vi.mocked(adService.getAdById).mockResolvedValue(mockAd);

    renderAdDetailsPage();

    await waitFor(() => {
      const mainImages = screen.getAllByRole('img').filter(img => (img as HTMLImageElement).src.includes('thumbs-md'));
      expect(mainImages[0]).toHaveClass(styles.adDetailsLightboxImage);
      expect(mainImages[0]).toHaveClass('uk-object-cover');
    });
  });

  it('should show "no images" placeholder if ad has no media', async () => {
    vi.mocked(adService.getAdById).mockResolvedValue({ ...mockAd, mediaPaths: [] });

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText(/No images available/i)).toBeInTheDocument();
      const placeholder = screen.getByRole('img');
      expect(placeholder.getAttribute('src')).toBe('/placeholder-image.svg');
    });
  });

  it('should render slider items with data-index attributes for robust tracking', async () => {
    vi.mocked(adService.getAdById).mockResolvedValue(mockAd);

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText('Test Ad')).toBeInTheDocument();
    });

    // The main slider items should have data-index attributes
    const allItems = screen.getAllByRole('listitem');
    const itemsWithIndex = allItems.filter(item => item.hasAttribute('data-index'));
    
    // We expect at least the main slider items to have it.
    // mockAd has 2 images. Main slider has 2 items.
    expect(itemsWithIndex.length).toBeGreaterThanOrEqual(2);
    expect(itemsWithIndex[0]).toHaveAttribute('data-index', '0');
    expect(itemsWithIndex[1]).toHaveAttribute('data-index', '1');
  });

  it('should render category breadcrumbs in NavbarPortal', async () => {
    const adWithCategory: AdDetailsDto = {
      ...mockAd,
      categoryPath: [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Computers' }
      ]
    };
    vi.mocked(adService.getAdById).mockResolvedValue(adWithCategory);

    renderAdDetailsPage();

    await waitFor(() => {
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Computers')).toBeInTheDocument();
    });
  });
});
