import React, { forwardRef } from 'react'

type ProgressProps = React.ProgressHTMLAttributes<HTMLProgressElement>

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = ['uk-progress']
    if (customClassName) {
      classNames.push(customClassName)
    }

    return <progress ref={ref} className={classNames.join(' ')} {...props} />
  },
)