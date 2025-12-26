import React, { forwardRef } from 'react'

type ThumbnavProps = React.PropsWithChildren<{
  vertical?: boolean
}> &
  React.HTMLAttributes<HTMLUListElement>

export const Thumbnav = forwardRef<HTMLUListElement, ThumbnavProps>(
  ({ children, vertical, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-thumbnav']
    if (vertical) classNames.push('uk-thumbnav-vertical')
    if (customClassName) classNames.push(customClassName)

    return (
      <ul ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </ul>
    )
  }
)