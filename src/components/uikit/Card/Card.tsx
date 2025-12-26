import React, { forwardRef } from 'react'

type CardProps = React.PropsWithChildren<{
  variant?: 'default' | 'primary' | 'secondary' | 'hover'
  size?: 'small' | 'large'
}> &
  React.HTMLAttributes<HTMLDivElement>

export const Card = forwardRef<HTMLDivElement, CardProps>(
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
    const classNames = ['uk-card']

    if (variant && variant !== 'default') {
      classNames.push(`uk-card-${variant}`)
    } else {
      classNames.push('uk-card-default')
    }

    if (size) {
      classNames.push(`uk-card-${size}`)
    }
    if (customClassName) {
      classNames.push(customClassName)
    }

    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const CardBody = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-card-body']
  if (customClassName) {
    classNames.push(customClassName)
  }
  return (
    <div ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </div>
  )
})

export const CardHeader = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-card-header']
  if (customClassName) {
    classNames.push(customClassName)
  }
  return (
    <div ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </div>
  )
})

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-card-footer']
  if (customClassName) {
    classNames.push(customClassName)
  }
  return (
    <div ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </div>
  )
})

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-card-title']
  if (customClassName) {
    classNames.push(customClassName)
  }
  return (
    <h3 ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </h3>
  )
})

export const CardMedia = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ position: 'top' | 'bottom' }> &
    React.HTMLAttributes<HTMLDivElement>
>(({ children, className: customClassName, position, ...props }, ref) => {
  const classNames = [`uk-card-media-${position}`]
  if (customClassName) {
    classNames.push(customClassName)
  }
  return (
    <div ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </div>
  )
})