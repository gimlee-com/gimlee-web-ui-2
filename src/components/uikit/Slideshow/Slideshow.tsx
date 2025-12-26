import React, { forwardRef, useMemo } from 'react'

type UkBoolean = boolean | 'true' | 'false'

export type SlideshowProps = React.HTMLAttributes<HTMLDivElement> & {
  animation?: 'slide' | 'fade' | 'scale' | 'pull' | 'push'
  autoplay?: boolean
  autoplayInterval?: number
  finite?: boolean
  pauseOnHover?: boolean
  index?: number
  velocity?: number
  ratio?: string | number
  minHeight?: number | string
  maxHeight?: number | string
}

export const Slideshow = forwardRef<HTMLDivElement, SlideshowProps>(
  (
    {
      children,
      className: customClassName,
      animation,
      autoplay,
      autoplayInterval,
      finite,
      pauseOnHover,
      index,
      velocity,
      ratio,
      minHeight,
      maxHeight,
      ...props
    },
    ref
  ) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const ukSlideshowOptions = useMemo(() => {
      const opts: string[] = []
      if (animation) opts.push(`animation: ${animation}`)
      if (autoplay !== undefined) opts.push(`autoplay: ${autoplay}`)
      if (autoplayInterval !== undefined)
        opts.push(`autoplay-interval: ${autoplayInterval}`)
      if (finite !== undefined) opts.push(`finite: ${finite}`)
      if (pauseOnHover !== undefined) opts.push(`pause-on-hover: ${pauseOnHover}`)
      if (index !== undefined) opts.push(`index: ${index}`)
      if (velocity !== undefined) opts.push(`velocity: ${velocity}`)
      if (ratio !== undefined) opts.push(`ratio: ${ratio}`)
      if (minHeight !== undefined) opts.push(`min-height: ${minHeight}`)
      if (maxHeight !== undefined) opts.push(`max-height: ${maxHeight}`)
      return opts.join('; ')
    }, [
      animation,
      autoplay,
      autoplayInterval,
      finite,
      pauseOnHover,
      index,
      velocity,
      ratio,
      minHeight,
      maxHeight,
    ])

    return (
      <div
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-slideshow={ukSlideshowOptions || ''}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SlideshowItems = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-slideshow-items']
  if (customClassName) classNames.push(customClassName)
  return (
    <ul ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </ul>
  )
})

export const SlideshowItem = forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ children, className: customClassName, ...props }, ref) => {
  if (customClassName) {
    return (
      <li ref={ref} className={customClassName} {...props}>
        {children}
      </li>
    )
  }
  return (
    <li ref={ref} {...props}>
      {children}
    </li>
  )
})
