import React, { forwardRef } from 'react'

type PanelProps = React.PropsWithChildren<{
  scrollable?: boolean
}> &
  React.HTMLAttributes<HTMLDivElement>

/** UIkit Panel wrapper */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ children, className: customClassName, scrollable, ...props }, ref) => {
    const classNames = ['uk-panel']
    if (scrollable) {
      classNames.push('uk-panel-scrollable')
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
