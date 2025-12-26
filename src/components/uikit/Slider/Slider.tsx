import React, { forwardRef, useMemo } from 'react'

type SliderProps = React.HTMLAttributes<HTMLDivElement> & {
  autoplay?: boolean
  autoplayInterval?: number
  center?: boolean
  draggable?: boolean
  easing?: string
  finite?: boolean
  index?: number
  active?: 'all' | 'first'
  pauseOnHover?: boolean
  sets?: boolean
  velocity?: number
  parallax?: boolean
  parallaxStart?: string | number
  parallaxEnd?: string | number
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      children,
      autoplay,
      autoplayInterval,
      center,
      draggable,
      easing,
      finite,
      index,
      active,
      pauseOnHover,
      sets,
      velocity,
      parallax,
      parallaxStart,
      parallaxEnd,
      className: customClassName,
      ...props
    },
    ref
  ) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const sliderOptions = useMemo(() => {
      const opts: string[] = []
      if (autoplay !== undefined) opts.push(`autoplay: ${autoplay}`)
      if (autoplayInterval !== undefined) opts.push(`autoplay-interval: ${autoplayInterval}`)
      if (center !== undefined) opts.push(`center: ${center}`)
      if (draggable !== undefined) opts.push(`draggable: ${draggable}`)
      if (easing) opts.push(`easing: ${easing}`)
      if (finite !== undefined) opts.push(`finite: ${finite}`)
      if (index !== undefined) opts.push(`index: ${index}`)
      if (active) opts.push(`active: ${active}`)
      if (pauseOnHover !== undefined) opts.push(`pause-on-hover: ${pauseOnHover}`)
      if (sets !== undefined) opts.push(`sets: ${sets}`)
      if (velocity !== undefined) opts.push(`velocity: ${velocity}`)
      if (parallax !== undefined) opts.push(`parallax: ${parallax}`)
      if (parallaxStart !== undefined) opts.push(`parallax-start: ${parallaxStart}`)
      if (parallaxEnd !== undefined) opts.push(`parallax-end: ${parallaxEnd}`)
      return opts.join('; ')
    }, [
      autoplay,
      autoplayInterval,
      center,
      draggable,
      easing,
      finite,
      index,
      active,
      pauseOnHover,
      sets,
      velocity,
      parallax,
      parallaxStart,
      parallaxEnd,
    ])

    return (
      <div
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-slider={sliderOptions || ''}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SliderContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { offset?: boolean }>(
  ({ children, offset, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-slider-container']
    if (offset) classNames.push('uk-slider-container-offset')
    if (customClassName) classNames.push(customClassName)
    return <div ref={ref} className={classNames.join(' ')} {...props}>{children}</div>
  }
)

export const SliderItems = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-slider-items']
    if (customClassName) classNames.push(customClassName)
    return <ul ref={ref} className={classNames.join(' ')} {...props}>{children}</ul>
  }
)

export const SliderItem = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ children, ...props }, ref) => <li ref={ref} {...props}>{children}</li>
)

export const SliderNav = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = ['uk-slider-nav']
    if (customClassName) classNames.push(customClassName)
    return <ul ref={ref} className={classNames.join(' ')} {...props} />
  }
)
