import React, { forwardRef } from 'react'
import { useUIKit } from '../../../hooks/useUIkit'
import { useMergeRefs } from '../../../hooks/useMergeRefs'
import UIkit from 'uikit'

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
    const { ref: uikitRef } = useUIKit<UIkit.UIkitOffcanvasElement, HTMLDivElement>(
      'offcanvas',
      {
        mode,
        flip,
        overlay,
        'esc-close': escClose,
        'bg-close': bgClose,
        container,
      }
    )

    const mergedRef = useMergeRefs(uikitRef, ref)

    const classNames = []
    if (customClassName) classNames.push(customClassName)

    return (
      <div
        ref={mergedRef}
        className={classNames.join(' ')}
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
