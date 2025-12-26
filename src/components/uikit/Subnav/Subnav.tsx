import React, { forwardRef } from 'react'

type SubnavProps = React.PropsWithChildren<{
  variant?: 'divider' | 'pill'
}> &
  React.HTMLAttributes<HTMLUListElement>

export const Subnav = forwardRef<HTMLUListElement, SubnavProps>(
  ({ children, variant, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-subnav']
    if (variant) classNames.push(`uk-subnav-${variant}`)
    if (customClassName) classNames.push(customClassName)

    return (
      <ul ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </ul>
    )
  }
)