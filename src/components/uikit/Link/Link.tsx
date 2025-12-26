import React, { forwardRef } from 'react'

type LinkProps = React.PropsWithChildren<{
  variant?: 'muted' | 'text' | 'heading' | 'reset'
}> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, variant, className: customClassName, ...props }, ref) => {
    const classNames = []
    if (variant) {
      classNames.push(`uk-link-${variant}`)
    }
    if (customClassName) {
      classNames.push(customClassName)
    }

    return (
      <a
        ref={ref}
        className={classNames.length > 0 ? classNames.join(' ') : undefined}
        {...props}
      >
        {children}
      </a>
    )
  }
)