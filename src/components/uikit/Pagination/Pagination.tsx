import React, { forwardRef } from 'react'

type PaginationProps = React.HTMLAttributes<HTMLUListElement>

export const Pagination = forwardRef<HTMLUListElement, PaginationProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-pagination']
    if (customClassName) classNames.push(customClassName)

    return (
      <ul ref={ref} className={classNames.join(' ')} uk-margin="" {...props}>
        {children}
      </ul>
    )
  }
)

type PaginationItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  active?: boolean
  disabled?: boolean
}

export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ children, active, disabled, className: customClassName, ...props }, ref) => {
    const classNames = []
    if (active) classNames.push('uk-active')
    if (disabled) classNames.push('uk-disabled')
    if (customClassName) classNames.push(customClassName)

    return (
      <li ref={ref} className={classNames.join(' ') || undefined} {...props}>
        {children}
      </li>
    )
  }
)

export const PaginationPrevious = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)
    return <span ref={ref} className={classNames.join(' ') || undefined} uk-pagination-previous="" {...props} />
  }
)

export const PaginationNext = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)
    return <span ref={ref} className={classNames.join(' ') || undefined} uk-pagination-next="" {...props} />
  }
)
