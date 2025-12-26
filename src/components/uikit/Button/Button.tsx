import React, { forwardRef } from 'react'

type ButtonProps = React.PropsWithChildren<{
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'text' | 'link'
  size?: 'small' | 'large'
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className: customClassName,
      variant = 'default',
      size,
      ...props
    },
    ref
  ) => {
    const classNames = ['uk-button']

    if (variant) {
      classNames.push(`uk-button-${variant}`)
    }
    if (size) {
      classNames.push(`uk-button-${size}`)
    }
    if (customClassName) {
      classNames.push(customClassName)
    }

    return (
      <button ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </button>
    )
  }
)