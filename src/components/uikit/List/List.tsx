import React, { forwardRef } from 'react'

type ListVariant = 'disc' | 'circle' | 'square' | 'decimal' | 'hyphen' | 'bullet'
type ListColor = 'muted' | 'emphasis' | 'primary' | 'secondary'
type ListSize = 'large' | 'collapse'

type ListProps = React.HTMLAttributes<HTMLUListElement> & {
  variant?: ListVariant
  color?: ListColor
  divider?: boolean
  striped?: boolean
  size?: ListSize
  tag?: React.ElementType
}

export const List = forwardRef<HTMLElement, ListProps>(
  ({ children, variant, color, divider, striped, size, tag: Tag = 'ul', className: customClassName, ...props }, ref) => {
    const classNames = ['uk-list']
    if (variant) classNames.push(`uk-list-${variant}`)
    if (color) classNames.push(`uk-list-${color}`)
    if (divider) classNames.push('uk-list-divider')
    if (striped) classNames.push('uk-list-striped')
    if (size) classNames.push(`uk-list-${size}`)
    if (customClassName) classNames.push(customClassName)

    const role = Tag === 'div' ? 'list' : undefined

    return (
      <Tag ref={ref} className={classNames.join(' ')} role={role} {...props}>
        {children}
      </Tag>
    )
  }
)

type ListItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  tag?: React.ElementType
}

export const ListItem = forwardRef<HTMLElement, ListItemProps>(
  ({ children, tag: Tag = 'li', ...props }, ref) => {
    const role = Tag === 'div' ? 'listitem' : undefined
    return <Tag ref={ref} role={role} {...props}>{children}</Tag>
  }
)
