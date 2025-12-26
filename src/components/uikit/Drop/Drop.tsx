import React, { forwardRef, useMemo } from 'react'

type UkBoolean = boolean | 'true' | 'false'

export type DropProps = React.HTMLAttributes<HTMLDivElement> & {
  toggle?: string
  pos?: string
  stretch?: boolean | 'x' | 'y'
  mode?: 'click' | 'hover' | 'click, hover'
  delayShow?: number
  delayHide?: number
  autoUpdate?: boolean
  boundary?: string | UkBoolean
  boundaryX?: string | UkBoolean
  boundaryY?: string | UkBoolean
  target?: string | UkBoolean
  targetX?: string | UkBoolean
  targetY?: string | UkBoolean
  inset?: boolean
  flip?: boolean | 'x' | 'y'
  shift?: boolean
  offset?: number
  animation?: string
  animateOut?: boolean
  bgScroll?: boolean
  closeOnScroll?: boolean
  duration?: number
  container?: string | UkBoolean
}

export const Drop = forwardRef<HTMLDivElement, DropProps>(
  (
    {
      children,
      toggle,
      pos,
      stretch,
      mode,
      delayShow,
      delayHide,
      autoUpdate,
      boundary,
      boundaryX,
      boundaryY,
      target,
      targetX,
      targetY,
      inset,
      flip,
      shift,
      offset,
      animation,
      animateOut,
      bgScroll,
      closeOnScroll,
      duration,
      container,
      className: customClassName,
      ...props
    },
    ref
  ) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const dropOptions = useMemo(() => {
      const opts: string[] = []
      if (toggle) opts.push(`toggle: ${toggle}`)
      if (pos) opts.push(`pos: ${pos}`)
      if (stretch !== undefined) opts.push(`stretch: ${stretch}`)
      if (mode) opts.push(`mode: ${mode}`)
      if (delayShow !== undefined) opts.push(`delay-show: ${delayShow}`)
      if (delayHide !== undefined) opts.push(`delay-hide: ${delayHide}`)
      if (autoUpdate !== undefined) opts.push(`auto-update: ${autoUpdate}`)
      if (boundary) opts.push(`boundary: ${boundary}`)
      if (boundaryX) opts.push(`boundary-x: ${boundaryX}`)
      if (boundaryY) opts.push(`boundary-y: ${boundaryY}`)
      if (target) opts.push(`target: ${target}`)
      if (targetX) opts.push(`target-x: ${targetX}`)
      if (targetY) opts.push(`target-y: ${targetY}`)
      if (inset !== undefined) opts.push(`inset: ${inset}`)
      if (flip !== undefined) opts.push(`flip: ${flip}`)
      if (shift !== undefined) opts.push(`shift: ${shift}`)
      if (offset !== undefined) opts.push(`offset: ${offset}`)
      if (animation) opts.push(`animation: ${animation}`)
      if (animateOut !== undefined) opts.push(`animate-out: ${animateOut}`)
      if (bgScroll !== undefined) opts.push(`bg-scroll: ${bgScroll}`)
      if (closeOnScroll !== undefined) opts.push(`close-on-scroll: ${closeOnScroll}`)
      if (duration !== undefined) opts.push(`duration: ${duration}`)
      if (container !== undefined) opts.push(`container: ${container}`)
      return opts.join('; ')
    }, [
      toggle,
      pos,
      stretch,
      mode,
      delayShow,
      delayHide,
      autoUpdate,
      boundary,
      boundaryX,
      boundaryY,
      target,
      targetX,
      targetY,
      inset,
      flip,
      shift,
      offset,
      animation,
      animateOut,
      bgScroll,
      closeOnScroll,
      duration,
      container,
    ])

    return (
      <div
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-drop={dropOptions || ''}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const DropParentIcon = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)
    return <span ref={ref} className={classNames.join(' ') || undefined} uk-drop-parent-icon="" {...props} />
  }
)
