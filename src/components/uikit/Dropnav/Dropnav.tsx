import React, { forwardRef, useMemo } from 'react'

type UkBoolean = boolean | 'true' | 'false'

type DropnavProps = React.HTMLAttributes<HTMLElement> & {
  align?: 'left' | 'right' | 'center'
  dropbar?: boolean
  dropbarAnchor?: string
  stretch?: boolean | 'x' | 'y'
  mode?: 'click' | 'hover' | 'click, hover'
  delayShow?: number
  delayHide?: number
  boundary?: string | UkBoolean
  target?: string | UkBoolean
  targetX?: string | UkBoolean
  targetY?: string | UkBoolean
  offset?: number
  animation?: string
  animateOut?: boolean
  bgScroll?: boolean
  closeOnScroll?: boolean
  duration?: number
  container?: string | UkBoolean
}

export const Dropnav = forwardRef<HTMLElement, DropnavProps>(
  (
    {
      children,
      align,
      dropbar,
      dropbarAnchor,
      stretch,
      mode,
      delayShow,
      delayHide,
      boundary,
      target,
      targetX,
      targetY,
      offset,
      animation,
      animateOut,
      bgScroll,
      closeOnScroll,
      duration,
      container,
      className: customClassName,
      ...props
    },
    ref
  ) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const dropnavOptions = useMemo(() => {
      const opts: string[] = []
      if (align) opts.push(`align: ${align}`)
      if (dropbar !== undefined) opts.push(`dropbar: ${dropbar}`)
      if (dropbarAnchor) opts.push(`dropbar-anchor: ${dropbarAnchor}`)
      if (stretch !== undefined) opts.push(`stretch: ${stretch}`)
      if (mode) opts.push(`mode: ${mode}`)
      if (delayShow !== undefined) opts.push(`delay-show: ${delayShow}`)
      if (delayHide !== undefined) opts.push(`delay-hide: ${delayHide}`)
      if (boundary !== undefined) opts.push(`boundary: ${boundary}`)
      if (target) opts.push(`target: ${target}`)
      if (targetX) opts.push(`target-x: ${targetX}`)
      if (targetY) opts.push(`target-y: ${targetY}`)
      if (offset !== undefined) opts.push(`offset: ${offset}`)
      if (animation) opts.push(`animation: ${animation}`)
      if (animateOut !== undefined) opts.push(`animate-out: ${animateOut}`)
      if (bgScroll !== undefined) opts.push(`bg-scroll: ${bgScroll}`)
      if (closeOnScroll !== undefined) opts.push(`close-on-scroll: ${closeOnScroll}`)
      if (duration !== undefined) opts.push(`duration: ${duration}`)
      if (container !== undefined) opts.push(`container: ${container}`)
      return opts.join('; ')
    }, [
      align,
      dropbar,
      dropbarAnchor,
      stretch,
      mode,
      delayShow,
      delayHide,
      boundary,
      target,
      targetX,
      targetY,
      offset,
      animation,
      animateOut,
      bgScroll,
      closeOnScroll,
      duration,
      container,
    ])

    return (
      <nav
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-dropnav={dropnavOptions || ''}
        {...props}
      >
        {children}
      </nav>
    )
  }
)
