import React, { forwardRef, useEffect, useRef } from 'react'
import UIkit from 'uikit'

type AlertProps = React.PropsWithChildren<{
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  /**
   * If provided, a close button will be displayed and this
   * function will be called after the close animation is complete.
   */
  onClose?: () => void
}> &
  React.HTMLAttributes<HTMLDivElement>

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      className: customClassName,
      variant,
      onClose,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const currentAlert = internalRef.current
      // If the onClose prop is provided, we listen for UIkit's 'hide' event.
      if (currentAlert && onClose) {
        const handleHide = () => {
          onClose()
        }

        // This event is triggered by UIkit after its closing animation is finished.
        UIkit.util.on(currentAlert, 'hide', handleHide)

        // Clean up the event listener when the component unmounts.
        return () => {
          if (currentAlert) {
            UIkit.util.off(currentAlert, 'hide', handleHide)
          }
        }
      }
    }, [onClose]) // Rerun this effect if the onClose handler changes.

    const classNames = ['uk-alert']
    if (variant) {
      classNames.push(`uk-alert-${variant}`)
    }
    if (customClassName) {
      classNames.push(customClassName)
    }

    const mergeRefs = (node: HTMLDivElement) => {
      internalRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <div
        ref={mergeRefs}
        className={classNames.join(' ')}
        uk-alert=""
        {...props}
      >
        {onClose && <button className="uk-alert-close" type="button" uk-close="" />}
        {children}
      </div>
    )
  },
)