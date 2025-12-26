import React, { forwardRef } from 'react'

export type SlidenavProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  type: 'previous' | 'next'
  large?: boolean
}

export const Slidenav = forwardRef<HTMLAnchorElement, SlidenavProps>(
  ({ type, large, className: customClassName, ...props }, ref) => {
    const classNames = []
    if (large) classNames.push('uk-slidenav-large')
    if (customClassName) classNames.push(customClassName)

    const slidenavAttr = `uk-slidenav-${type}`

    return (
      <a
        ref={ref}
        className={classNames.join(' ') || undefined}
        {...{ [slidenavAttr]: '' }}
        {...props}
      />
    )
  }
)

export const SlidenavContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-slidenav-container']
  if (customClassName) classNames.push(customClassName)
  return (
    <div ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </div>
  )
})
