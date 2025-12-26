import React, { forwardRef } from 'react'

type OverlayVariant = 'default' | 'primary'

type OverlayProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: OverlayVariant
}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ children, variant, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-overlay']
    if (variant) classNames.push(`uk-overlay-${variant}`)
    if (customClassName) classNames.push(customClassName)

    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const OverlayIcon = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)
    return <span ref={ref} className={classNames.join(' ') || undefined} uk-overlay-icon="" {...props} />
  }
)
