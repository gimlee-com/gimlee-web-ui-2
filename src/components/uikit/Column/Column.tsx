import React, { forwardRef } from 'react'

type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6

type ColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  count?: ColumnCount
  divider?: boolean
  s?: ColumnCount
  m?: ColumnCount
  l?: ColumnCount
  xl?: ColumnCount
}

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, count, divider, s, m, l, xl, className: customClassName, ...props }, ref) => {
    const classNames = []
    if (count) classNames.push(`uk-column-1-${count}`)
    if (divider) classNames.push('uk-column-divider')
    if (s) classNames.push(`uk-column-1-${s}@s`)
    if (m) classNames.push(`uk-column-1-${m}@m`)
    if (l) classNames.push(`uk-column-1-${l}@l`)
    if (xl) classNames.push(`uk-column-1-${xl}@xl`)
    if (customClassName) classNames.push(customClassName)

    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const ColumnSpan = forwardRef<HTMLElement, React.AllHTMLAttributes<HTMLElement> & { tag?: React.ElementType }>(
  ({ children, className: customClassName, tag: Tag = 'p', ...props }, ref) => {
    const classNames = ['uk-column-span']
    if (customClassName) classNames.push(customClassName)

    return (
      <Tag ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </Tag>
    )
  }
)
