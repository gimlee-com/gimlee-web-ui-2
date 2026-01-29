import React, { type ElementType, forwardRef } from 'react'
import { useUIKit } from '../../../hooks/useUIkit'
import { useMergeRefs } from '../../../hooks/useMergeRefs'
import UIkit from 'uikit'

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
    /** CSS selector of the element to which the sticky object should be aligned. */
    selTarget?: string
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
      selTarget,
      ...props
    },
    ref
  ) => {
    const { ref: uikitRef } = useUIKit<UIkit.UIkitElementBase, HTMLElement>(
      'sticky',
      {
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
        selTarget,
      }
    )

    const mergedRef = useMergeRefs(uikitRef, ref)

    const classNames = [customClassName].filter(Boolean).join(' ') || undefined

    return (
      <Component ref={mergedRef} className={classNames} {...props}>
        {children}
      </Component>
    )
  }
)