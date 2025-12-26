import React, { forwardRef } from 'react'

export const Placeholder = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-placeholder']
    if (customClassName) classNames.push(customClassName)

    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)
