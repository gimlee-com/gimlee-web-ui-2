import React, { forwardRef } from 'react'

type IconnavProps = React.PropsWithChildren<{
  vertical?: boolean
}> &
  React.HTMLAttributes<HTMLUListElement>

export const Iconnav = forwardRef<HTMLUListElement, IconnavProps>(
  ({ children, vertical, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-iconnav']
    if (vertical) classNames.push('uk-iconnav-vertical')
    if (customClassName) classNames.push(customClassName)

    return (
      <ul ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </ul>
    )
  }
)