import React, { forwardRef } from 'react'

type ContainerSize = 'xsmall' | 'small' | 'large' | 'xlarge' | 'expand'

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Size modifier (defaults to normal container width) */
  size?: ContainerSize
}

/** UIkit Container wrapper */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className: customClassName, size, ...props }, ref) => {
    const classNames = ['uk-container']
    if (size) classNames.push(`uk-container-${size}`)
    if (customClassName) classNames.push(customClassName)

    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)