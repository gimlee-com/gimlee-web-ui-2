import React, { forwardRef } from 'react'

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  divider?: boolean
  striped?: boolean
  hover?: boolean
  small?: boolean
  large?: boolean
  justify?: boolean
  middle?: boolean
  responsive?: boolean
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      children,
      divider,
      striped,
      hover,
      small,
      large,
      justify,
      middle,
      responsive,
      className: customClassName,
      ...props
    },
    ref
  ) => {
    const classNames = ['uk-table']
    if (divider) classNames.push('uk-table-divider')
    if (striped) classNames.push('uk-table-striped')
    if (hover) classNames.push('uk-table-hover')
    if (small) classNames.push('uk-table-small')
    if (large) classNames.push('uk-table-large')
    if (justify) classNames.push('uk-table-justify')
    if (middle) classNames.push('uk-table-middle')
    if (responsive) classNames.push('uk-table-responsive')
    if (customClassName) classNames.push(customClassName)

    return (
      <table ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </table>
    )
  }
)
