import React, { forwardRef } from 'react'

type SearchVariant = 'default' | 'navbar' | 'medium' | 'large'

type SearchProps = React.FormHTMLAttributes<HTMLFormElement> & {
  variant?: SearchVariant
}

export const Search = forwardRef<HTMLFormElement, SearchProps>(
  ({ children, variant = 'default', className: customClassName, ...props }, ref) => {
    const classNames = ['uk-search']
    if (variant) classNames.push(`uk-search-${variant}`)
    if (customClassName) classNames.push(customClassName)

    return (
      <form ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </form>
    )
  }
)

export const SearchInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = ['uk-search-input']
    if (customClassName) classNames.push(customClassName)
    return <input ref={ref} className={classNames.join(' ')} type="search" {...props} />
  }
)

type SearchIconProps = React.AllHTMLAttributes<HTMLElement> & {
  flip?: boolean
  tag?: React.ElementType
}

export const SearchIcon = forwardRef<HTMLElement, SearchIconProps>(
  ({ flip, tag: Tag = 'span', className: customClassName, ...props }, ref) => {
    const classNames = []
    if (flip) classNames.push('uk-search-icon-flip')
    if (customClassName) classNames.push(customClassName)
    return <Tag ref={ref} className={classNames.join(' ') || undefined} uk-search-icon="" {...props} />
  }
)

export const SearchToggle = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = ['uk-search-toggle']
    if (customClassName) classNames.push(customClassName)
    return <a ref={ref} className={classNames.join(' ')} uk-search-icon="" {...props} />
  }
)
