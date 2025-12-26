import React, { forwardRef, useMemo } from 'react'

type UkBoolean = boolean | 'true' | 'false'

export type TabProps = React.HTMLAttributes<HTMLUListElement> & {
  connect?: string
  toggle?: string
  active?: number
  animation?: string | UkBoolean
  duration?: number
  swiping?: boolean
  media?: number | string
}

export const Tab = forwardRef<HTMLUListElement, TabProps>(
  (
    {
      className: customClassName,
      children,
      connect,
      toggle,
      active,
      animation,
      duration,
      swiping,
      media,
      ...props
    },
    ref
  ) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const ukTabOptions = useMemo(() => {
      const opts: string[] = []
      if (connect) opts.push(`connect: ${connect}`)
      if (toggle) opts.push(`toggle: ${toggle}`)
      if (active !== undefined) opts.push(`active: ${active}`)
      if (animation !== undefined) opts.push(`animation: ${animation}`)
      if (duration !== undefined) opts.push(`duration: ${duration}`)
      if (swiping !== undefined) opts.push(`swiping: ${swiping}`)
      if (media !== undefined) opts.push(`media: ${media}`)
      return opts.join('; ')
    }, [connect, toggle, active, animation, duration, swiping, media])

    return (
      <ul
        ref={ref}
        className={['uk-tab', ...classNames].join(' ')}
        uk-tab={ukTabOptions || ''}
        {...props}
      >
        {children}
      </ul>
    )
  }
)

export type TabItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  active?: boolean
  disabled?: boolean
}

export const TabItem = forwardRef<HTMLLIElement, TabItemProps>(
  ({ children, className: customClassName, active, disabled, ...props }, ref) => {
    const classNames = []
    if (active) classNames.push('uk-active')
    if (disabled) classNames.push('uk-disabled')
    if (customClassName) classNames.push(customClassName)

    return (
      <li ref={ref} className={classNames.join(' ') || undefined} {...props}>
        {children}
      </li>
    )
  }
)
