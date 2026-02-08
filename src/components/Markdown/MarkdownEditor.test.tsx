import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MarkdownEditor } from './MarkdownEditor';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

describe('MarkdownEditor Real', () => {
  it('should render without RangeError', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MarkdownEditor value="Hello" />
      </I18nextProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  it('should show toolbar with buttons', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MarkdownEditor value="" />
      </I18nextProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTitle(/Bold/i)).toBeInTheDocument();
    });
    expect(screen.getByTitle(/Italic/i)).toBeInTheDocument();
    expect(screen.getByText('H1')).toBeInTheDocument();
    expect(screen.getByTitle(/Link/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Insert Image/i)).toBeInTheDocument();
  });

  it('should update content when value prop changes', async () => {
    const { rerender } = render(
      <I18nextProvider i18n={i18n}>
        <MarkdownEditor value="Initial" />
      </I18nextProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Initial')).toBeInTheDocument();
    });

    rerender(
      <I18nextProvider i18n={i18n}>
        <MarkdownEditor value="Updated Content" />
      </I18nextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Updated Content')).toBeInTheDocument();
    });
  });
});
