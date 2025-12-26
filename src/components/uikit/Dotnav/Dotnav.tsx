import React, { forwardRef } from 'react'

type DotnavProps = React.HTMLAttributes<HTMLUListElement> & {
  vertical?: boolean
}

export const Dotnav = forwardRef<HTMLUListElement, DotnavProps>(
  ({ children, vertical, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-dotnav']
    if (vertical) classNames.push('uk-dotnav-vertical')
    if (customClassName) classNames.push(customClassName)

    return (
      <ul ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </ul>
    )
  }
)

type DotnavItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  active?: boolean
}

export const DotnavItem = forwardRef<HTMLLIElement, DotnavItemProps>(
  ({ children, active, className: customClassName, ...props }, ref) => {
    const classNames = []
    if (active) classNames.push('uk-active')
    if (customClassName) classNames.push(customClassName)

    return (
      <li ref={ref} className={classNames.join(' ') || undefined} {...props}>
        {children}
      </li>
    )
  }
)
