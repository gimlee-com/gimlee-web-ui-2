import React, { forwardRef } from 'react'

export type BreadcrumbProps = React.HTMLAttributes<HTMLUListElement>

export const Breadcrumb = forwardRef<HTMLUListElement, BreadcrumbProps>(
  ({ className: customClassName, children, ...props }, ref) => {
    const classNames = ['uk-breadcrumb']
    if (customClassName) classNames.push(customClassName)
    return (
      <ul ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </ul>
    )
  }
)

export type BreadcrumbItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  disabled?: boolean
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, className: customClassName, disabled, ...props }, ref) => {
    const classNames = []
    if (disabled) classNames.push('uk-disabled')
    if (customClassName) classNames.push(customClassName)
    return (
      <li ref={ref} className={classNames.join(' ') || undefined} {...props}>
        {children}
      </li>
    )
  }
)
