import React, { forwardRef, useMemo } from 'react'

type UkBoolean = boolean | 'true' | 'false'

export type AccordionProps = React.HTMLAttributes<HTMLUListElement> & {
  active?: number | UkBoolean
  animation?: boolean
  collapsible?: boolean
  content?: string
  duration?: number
  multiple?: boolean
  targets?: string
  toggle?: string
  transition?: string
  offset?: number
}

export const Accordion = forwardRef<HTMLUListElement, AccordionProps>(
  (
    {
      className: customClassName,
      children,
      active,
      animation,
      collapsible,
      content,
      duration,
      multiple,
      targets,
      toggle,
      transition,
      offset,
      ...props
    },
    ref
  ) => {
    const classNames = ['uk-accordion']
    if (customClassName) classNames.push(customClassName)

    const ukAccordionOptions = useMemo(() => {
      const opts: string[] = []
      if (active !== undefined) opts.push(`active: ${active}`)
      if (animation !== undefined) opts.push(`animation: ${animation}`)
      if (collapsible !== undefined) opts.push(`collapsible: ${collapsible}`)
      if (content) opts.push(`content: ${content}`)
      if (duration !== undefined) opts.push(`duration: ${duration}`)
      if (multiple !== undefined) opts.push(`multiple: ${multiple}`)
      if (targets) opts.push(`targets: ${targets}`)
      if (toggle) opts.push(`toggle: ${toggle}`)
      if (transition) opts.push(`transition: ${transition}`)
      if (offset !== undefined) opts.push(`offset: ${offset}`)
      return opts.join('; ')
    }, [
      active,
      animation,
      collapsible,
      content,
      duration,
      multiple,
      targets,
      toggle,
      transition,
      offset,
    ])

    return (
      <ul
        ref={ref}
        className={classNames.join(' ')}
        uk-accordion={ukAccordionOptions || undefined}
        {...props}
      >
        {children}
      </ul>
    )
  }
)

export type AccordionItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  open?: boolean
}

export const AccordionItem = forwardRef<HTMLLIElement, AccordionItemProps>(
  ({ children, className: customClassName, open, ...props }, ref) => {
    const classNames = []
    if (open) classNames.push('uk-open')
    if (customClassName) classNames.push(customClassName)
    return (
      <li ref={ref} className={classNames.join(' ') || undefined} {...props}>
        {children}
      </li>
    )
  }
)

export const AccordionTitle = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-accordion-title']
  if (customClassName) classNames.push(customClassName)
  return (
    <a ref={ref} className={classNames.join(' ')} href="#" {...props}>
      {children}
    </a>
  )
})

export const AccordionContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-accordion-content']
  if (customClassName) classNames.push(customClassName)
  return (
    <div ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </div>
  )
})

export const AccordionIcon: React.FC = () => <span uk-accordion-icon="" />
