import React, { forwardRef } from 'react'
import { useUIKit } from '../../../hooks/useUIkit'

type GridProps = React.PropsWithChildren<{
  gap?: 'small' | 'medium' | 'large' | 'collapse'
  divider?: boolean
  match?: boolean
  masonry?: boolean | 'pack' | 'next'
  parallax?: number
}> &
  React.HTMLAttributes<HTMLDivElement>

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      className: customClassName,
      gap,
      divider,
      match,
      masonry,
      parallax,
      ...props
    },
    ref
  ) => {
    // We pass the JavaScript-specific options to our hook.
    const { ref: uikitRef } = useUIKit<HTMLElement, HTMLElement>('grid', {
      masonry,
      parallax,
    })

    const classNames = []
    if (gap) classNames.push(`uk-grid-${gap}`)
    if (divider) classNames.push('uk-grid-divider')
    if (match) classNames.push('uk-grid-match')

    if (customClassName) {
      classNames.push(customClassName)
    }

    // A helper function to merge the refs.
    const mergeRefs = (node: HTMLDivElement) => {
      uikitRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <div
        ref={mergeRefs}
        className={classNames.join(' ')}
        uk-grid=""
        {...props}
      >
        {children}
      </div>
    )
  }
)