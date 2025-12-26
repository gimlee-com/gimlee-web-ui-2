import React, {type ElementType, forwardRef, useMemo } from 'react'

type StickyProps<T extends HTMLElement = HTMLElement> =
  React.HTMLAttributes<T> & {
    as?: ElementType
    position?: 'top' | 'bottom'
    start?: number | string // px, %, vh, selector
    end?: number | string | boolean // px, %, vh, selector, true=parent, false=end of page
    offset?: number | string
    offsetEnd?: number | string
    overflowFlip?: boolean
    animation?: string
    clsActive?: string
    clsInactive?: string
    showOnUp?: boolean
    media?: number | string | boolean // breakpoint, px, media query, or false
    targetOffset?: number | string
  }

/** UIkit Sticky wrapper */
export const Sticky = forwardRef<HTMLElement, StickyProps>(
  (
    {
      as: Component = 'div',
      className: customClassName,
      children,
      position,
      start,
      end,
      offset,
      offsetEnd,
      overflowFlip,
      animation,
      clsActive,
      clsInactive,
      showOnUp,
      media,
      targetOffset,
      ...props
    },
    ref
  ) => {
    const classNames = [customClassName].filter(Boolean).join(' ') || undefined

    const ukOptions = useMemo(() => {
      const opts: string[] = []
      if (position) opts.push(`position: ${position}`)
      if (start !== undefined) opts.push(`start: ${start}`)
      if (end !== undefined) opts.push(`end: ${end}`)
      if (offset !== undefined) opts.push(`offset: ${offset}`)
      if (offsetEnd !== undefined) opts.push(`offset-end: ${offsetEnd}`)
      if (overflowFlip !== undefined) opts.push(`overflow-flip: ${overflowFlip}`)
      if (animation) opts.push(`animation: ${animation}`)
      if (clsActive) opts.push(`cls-active: ${clsActive}`)
      if (clsInactive) opts.push(`cls-inactive: ${clsInactive}`)
      if (showOnUp !== undefined) opts.push(`show-on-up: ${showOnUp}`)
      if (media !== undefined) opts.push(`media: ${media}`)
      if (targetOffset !== undefined) opts.push(`target-offset: ${targetOffset}`)
      return opts.join('; ')
    }, [
      position,
      start,
      end,
      offset,
      offsetEnd,
      overflowFlip,
      animation,
      clsActive,
      clsInactive,
      showOnUp,
      media,
      targetOffset,
    ])

    return (
      <Component
        ref={ref}
        className={classNames}
        uk-sticky={ukOptions || undefined}
        {...props}
      >
        {children}
      </Component>
    )
  }
)