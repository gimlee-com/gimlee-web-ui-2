import React, { forwardRef, useMemo } from 'react'

type UkBoolean = boolean | 'true' | 'false'

type NavbarProps = React.HTMLAttributes<HTMLElement> & {
  /** UIkit dropdown alignment */
  align?: 'left' | 'right' | 'center'
  /** Enable dropbar below navbar */
  dropbar?: boolean
  /** Selector to insert dropbar after */
  dropbarAnchor?: string
  /** How transparent navbars interact with dropbar */
  dropbarTransparentMode?: 'behind' | 'remove'
  /** Dropdown trigger modes */
  mode?: 'click' | 'hover' | 'click, hover'
  /** Delay before showing dropdowns (ms) */
  delayShow?: number
  /** Delay before hiding dropdowns (ms) */
  delayHide?: number
  /** Boundary selector or true (nearest scroll ancestor) */
  boundary?: string | UkBoolean
  /** Target element to align dropdowns to */
  target?: string | UkBoolean
  targetX?: string | UkBoolean
  targetY?: string | UkBoolean
  /** Dropdown offset (px) */
  offset?: number
  /** Dropdown animation classes */
  animation?: string
  /** Animation duration (ms) */
  duration?: number
  /** Close dropdowns on scroll */
  closeOnScroll?: boolean
}

/** Top-level navbar element. Add surrounding containers as needed. */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className: customClassName,
      children,
      align,
      dropbar,
      dropbarAnchor,
      dropbarTransparentMode,
      mode,
      delayShow,
      delayHide,
      boundary,
      target,
      targetX,
      targetY,
      offset,
      animation,
      duration,
      closeOnScroll,
      ...props
    },
    ref
  ) => {
    const classNames = ['uk-navbar']
    if (customClassName) classNames.push(customClassName)

    const ukNavbarOptions = useMemo(() => {
      const opts: string[] = []
      if (align) opts.push(`align: ${align}`)
      if (dropbar) opts.push('dropbar: true')
      if (dropbarAnchor) opts.push(`dropbar-anchor: ${dropbarAnchor}`)
      if (dropbarTransparentMode)
        opts.push(`dropbar-transparent-mode: ${dropbarTransparentMode}`)
      if (mode) opts.push(`mode: ${mode}`)
      if (delayShow !== undefined) opts.push(`delay-show: ${delayShow}`)
      if (delayHide !== undefined) opts.push(`delay-hide: ${delayHide}`)
      if (boundary !== undefined) opts.push(`boundary: ${boundary}`)
      if (target !== undefined) opts.push(`target: ${target}`)
      if (targetX !== undefined) opts.push(`target-x: ${targetX}`)
      if (targetY !== undefined) opts.push(`target-y: ${targetY}`)
      if (offset !== undefined) opts.push(`offset: ${offset}`)
      if (animation) opts.push(`animation: ${animation}`)
      if (duration !== undefined) opts.push(`duration: ${duration}`)
      if (closeOnScroll !== undefined)
        opts.push(`close-on-scroll: ${closeOnScroll}`)
      return opts.join('; ')
    }, [
      align,
      dropbar,
      dropbarAnchor,
      dropbarTransparentMode,
      mode,
      delayShow,
      delayHide,
      boundary,
      target,
      targetX,
      targetY,
      offset,
      animation,
      duration,
      closeOnScroll,
    ])

    return (
      <nav
        ref={ref}
        className={classNames.join(' ')}
        uk-navbar={ukNavbarOptions || undefined}
        {...props}
      >
        {children}
      </nav>
    )
  }
)

type DivProps = React.HTMLAttributes<HTMLDivElement>
type UlProps = React.HTMLAttributes<HTMLUListElement>
type LiProps = React.LiHTMLAttributes<HTMLLIElement>
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

/** Wrapper with uk-navbar-container; set transparent for hero overlays */
export const NavbarContainer = forwardRef<
  HTMLDivElement,
  DivProps & { transparent?: boolean }
>(({ children, className: customClassName, transparent, ...props }, ref) => {
  const classNames = ['uk-navbar-container']
  if (transparent) classNames.push('uk-navbar-transparent')
  if (customClassName) classNames.push(customClassName)
  return (
    <div ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </div>
  )
})

export const NavbarLeft = forwardRef<HTMLDivElement, DivProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-left']
    if (customClassName) classNames.push(customClassName)
    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const NavbarRight = forwardRef<HTMLDivElement, DivProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-right']
    if (customClassName) classNames.push(customClassName)
    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const NavbarCenter = forwardRef<HTMLDivElement, DivProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-center']
    if (customClassName) classNames.push(customClassName)
    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const NavbarCenterLeft = forwardRef<HTMLDivElement, DivProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-center-left']
    if (customClassName) classNames.push(customClassName)
    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const NavbarCenterRight = forwardRef<HTMLDivElement, DivProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-center-right']
    if (customClassName) classNames.push(customClassName)
    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const NavbarNav = forwardRef<HTMLUListElement, UlProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-nav']
    if (customClassName) classNames.push(customClassName)
    return (
      <ul ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </ul>
    )
  }
)

export const NavbarItem = forwardRef<HTMLLIElement, LiProps & { active?: boolean; parent?: boolean }>(
  ({ children, className: customClassName, active, parent, ...props }, ref) => {
    const classNames = []
    if (active) classNames.push('uk-active')
    if (parent) classNames.push('uk-parent')
    if (customClassName) classNames.push(customClassName)
    return (
      <li ref={ref} className={classNames.join(' ') || undefined} {...props}>
        {children}
      </li>
    )
  }
)

/** Use inside a parent item to show the caret */
export const NavbarParentIcon: React.FC = () => <span uk-navbar-parent-icon="" />

export const NavbarLogo = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-item', 'uk-logo']
    if (customClassName) classNames.push(customClassName)
    return (
      <a ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </a>
    )
  }
)

export const NavbarItemText = forwardRef<HTMLDivElement, DivProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-item']
    if (customClassName) classNames.push(customClassName)
    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const NavbarToggle = forwardRef<HTMLAnchorElement, AnchorProps & { label?: React.ReactNode }>(
  ({ className: customClassName, children, label, ...props }, ref) => {
    const classNames = ['uk-navbar-toggle']
    if (customClassName) classNames.push(customClassName)
    return (
      <a ref={ref} className={classNames.join(' ')} {...props}>
        <span uk-navbar-toggle-icon="" />
        {label ?? children}
      </a>
    )
  }
)

export const NavbarDropdown = forwardRef<HTMLDivElement, DivProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-navbar-dropdown']
    if (customClassName) classNames.push(customClassName)
    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)

export const NavbarDropdownNav = forwardRef<HTMLUListElement, UlProps>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-nav', 'uk-navbar-dropdown-nav']
    if (customClassName) classNames.push(customClassName)
    return (
      <ul ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </ul>
    )
  }
)