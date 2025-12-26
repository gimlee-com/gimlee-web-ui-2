import React, { forwardRef } from 'react'

type BadgeProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLSpanElement>
>

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-badge']
    if (customClassName) {
      classNames.push(customClassName)
    }

    return (
      <span ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </span>
    )
  },
)