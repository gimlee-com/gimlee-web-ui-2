import React, { forwardRef } from 'react'

type DescriptionListProps = React.HTMLAttributes<HTMLDListElement> & {
  divider?: boolean
}

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ children, divider, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-description-list']
    if (divider) classNames.push('uk-description-list-divider')
    if (customClassName) classNames.push(customClassName)

    return (
      <dl ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </dl>
    )
  }
)

export const DescriptionTerm = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => <dt ref={ref} {...props}>{children}</dt>
)

export const DescriptionDetails = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => <dd ref={ref} {...props}>{children}</dd>
)
