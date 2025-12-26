import React, { forwardRef } from 'react'

type LabelProps = React.PropsWithChildren<{
  variant?: 'default' | 'success' | 'warning' | 'danger'
}> &
  React.HTMLAttributes<HTMLSpanElement>

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      children,
      className: customClassName,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const classNames = ['uk-label']

    if (variant && variant !== 'default') {
      classNames.push(`uk-label-${variant}`)
    }
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