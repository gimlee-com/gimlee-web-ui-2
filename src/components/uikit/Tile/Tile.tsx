import React, { forwardRef } from 'react'

type TileVariant = 'default' | 'muted' | 'primary' | 'secondary'
type TilePadding = 'small' | 'large' | 'remove'

type TileProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: TileVariant
  preserveColor?: boolean
  padding?: TilePadding
}

export const Tile = forwardRef<HTMLDivElement, TileProps>(
  ({ children, variant, preserveColor, padding, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-tile']
    if (variant) classNames.push(`uk-tile-${variant}`)
    if (preserveColor) classNames.push('uk-preserve-color')
    if (padding) classNames.push(`uk-padding-${padding}`)
    if (customClassName) classNames.push(customClassName)

    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)
