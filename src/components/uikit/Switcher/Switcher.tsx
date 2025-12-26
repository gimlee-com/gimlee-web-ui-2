import React, { forwardRef, useMemo } from 'react'

type SwitcherProps = React.HTMLAttributes<HTMLElement> & {
  connect?: string
  toggle?: string
  itemNav?: string
  active?: number
  animation?: string | boolean
  duration?: number
  swiping?: boolean
  followFocus?: boolean
  /** Element tag to use for the toggle navigation (defaults to ul) */
  as?: React.ElementType
}

export const Switcher = forwardRef<HTMLElement, SwitcherProps>(
  (
    {
      children,
      className: customClassName,
      connect,
      toggle,
      itemNav,
      active,
      animation,
      duration,
      swiping,
      followFocus,
      as: Tag = 'ul',
      ...props
    },
    ref
  ) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const ukSwitcherOptions = useMemo(() => {
      const opts: string[] = []
      if (connect) opts.push(`connect: ${connect}`)
      if (toggle) opts.push(`toggle: ${toggle}`)
      if (itemNav) opts.push(`item-nav: ${itemNav}`)
      if (active !== undefined) opts.push(`active: ${active}`)
      if (animation !== undefined) opts.push(`animation: ${animation}`)
      if (duration !== undefined) opts.push(`duration: ${duration}`)
      if (swiping !== undefined) opts.push(`swiping: ${swiping}`)
      if (followFocus !== undefined) opts.push(`follow-focus: ${followFocus}`)
      return opts.join('; ')
    }, [
      connect,
      toggle,
      itemNav,
      active,
      animation,
      duration,
      swiping,
      followFocus,
    ])

    return (
      <Tag
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-switcher={ukSwitcherOptions || ''}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

export const SwitcherContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-switcher']
    if (customClassName) classNames.push(customClassName)
    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)
