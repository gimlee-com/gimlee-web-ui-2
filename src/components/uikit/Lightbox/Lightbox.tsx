import React, { forwardRef, useMemo } from 'react'

export type LightboxProps = React.HTMLAttributes<HTMLDivElement> & {
  animation?: 'slide' | 'fade' | 'scale'
  autoplay?: boolean
  autoplayInterval?: number
  pauseOnHover?: boolean
  videoAutoplay?: boolean | 'inline'
  counter?: boolean
  nav?: boolean | 'dotnav' | 'thumbnav'
  slidenav?: boolean
  index?: number | string
  delayControls?: number
  toggle?: string
  template?: string
  bgClose?: boolean
}

export const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(
  (
    {
      children,
      animation,
      autoplay,
      autoplayInterval,
      pauseOnHover,
      videoAutoplay,
      counter,
      nav,
      slidenav,
      index,
      delayControls,
      toggle,
      template,
      bgClose,
      className: customClassName,
      ...props
    },
    ref
  ) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const lightboxOptions = useMemo(() => {
      const opts: string[] = []
      if (animation) opts.push(`animation: ${animation}`)
      if (autoplay !== undefined) opts.push(`autoplay: ${autoplay}`)
      if (autoplayInterval !== undefined) opts.push(`autoplay-interval: ${autoplayInterval}`)
      if (pauseOnHover !== undefined) opts.push(`pause-on-hover: ${pauseOnHover}`)
      if (videoAutoplay !== undefined) opts.push(`video-autoplay: ${videoAutoplay}`)
      if (counter !== undefined) opts.push(`counter: ${counter}`)
      if (nav !== undefined) opts.push(`nav: ${nav}`)
      if (slidenav !== undefined) opts.push(`slidenav: ${slidenav}`)
      if (index !== undefined) opts.push(`index: ${index}`)
      if (delayControls !== undefined) opts.push(`delay-controls: ${delayControls}`)
      if (toggle) opts.push(`toggle: ${toggle}`)
      if (template) opts.push(`template: ${template}`)
      if (bgClose !== undefined) opts.push(`bg-close: ${bgClose}`)
      return opts.join('; ')
    }, [
      animation,
      autoplay,
      autoplayInterval,
      pauseOnHover,
      videoAutoplay,
      counter,
      nav,
      slidenav,
      index,
      delayControls,
      toggle,
      template,
      bgClose,
    ])

    return (
      <div
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-lightbox={lightboxOptions || ''}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export type LightboxItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  caption?: string
  alt?: string
  poster?: string
  type?: 'image' | 'video' | 'iframe'
  attrs?: string
}

export const LightboxItem = forwardRef<HTMLAnchorElement, LightboxItemProps>(
  ({ children, caption, alt, poster, type, attrs, ...props }, ref) => {
    return (
      <a
        ref={ref}
        data-caption={caption}
        data-alt={alt}
        data-poster={poster}
        data-type={type}
        data-attrs={attrs}
        {...props}
      >
        {children}
      </a>
    )
  }
)
