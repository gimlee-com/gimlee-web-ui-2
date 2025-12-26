import React, { forwardRef, useMemo } from 'react'

type UkBoolean = boolean | 'true' | 'false'

export type OffcanvasProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: 'slide' | 'reveal' | 'push' | 'none'
  flip?: boolean
  overlay?: boolean
  escClose?: boolean
  bgClose?: boolean
  container?: string | UkBoolean
}

export const Offcanvas = forwardRef<HTMLDivElement, OffcanvasProps>(
  (
    {
      className: customClassName,
      children,
      mode,
      flip,
      overlay,
      escClose,
      bgClose,
      container,
      ...props
    },
    ref
  ) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const ukOffcanvasOptions = useMemo(() => {
      const opts: string[] = []
      if (mode) opts.push(`mode: ${mode}`)
      if (flip !== undefined) opts.push(`flip: ${flip}`)
      if (overlay !== undefined) opts.push(`overlay: ${overlay}`)
      if (escClose !== undefined) opts.push(`esc-close: ${escClose}`)
      if (bgClose !== undefined) opts.push(`bg-close: ${bgClose}`)
      if (container !== undefined) opts.push(`container: ${container}`)
      return opts.join('; ')
    }, [mode, flip, overlay, escClose, bgClose, container])

    return (
      <div
        ref={ref}
        className={classNames.join(' ')}
        uk-offcanvas={ukOffcanvasOptions || ''}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const OffcanvasBar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-offcanvas-bar']
  if (customClassName) classNames.push(customClassName)
  return (
    <div ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </div>
  )
})

export const OffcanvasClose = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className: customClassName, ...props }, ref) => {
  const classNames = ['uk-offcanvas-close']
  if (customClassName) classNames.push(customClassName)
  return (
    <button
      ref={ref}
      className={classNames.join(' ')}
      type="button"
      uk-close=""
      {...props}
    />
  )
})
