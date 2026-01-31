import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Image } from './Image'

describe('Image component', () => {
  it('renders a placeholder when not loaded', () => {
    render(<Image src="https://example.com/image.jpg" alt="test image" />)
    
    // The placeholder is rendered initially
    const placeholder = screen.getByTestId('image-placeholder')
    expect(placeholder).toBeInTheDocument()
  })

  it('renders the uikit image component', () => {
    render(<Image src="https://example.com/image.jpg" alt="test image" />)
    
    const img = screen.getByAltText('test image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('data-src', 'https://example.com/image.jpg')
  })
})
