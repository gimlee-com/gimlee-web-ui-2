import React, { forwardRef } from 'react'

type SpinnerProps = {
  ratio?: number
} & React.HTMLAttributes<HTMLDivElement>

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ ratio, ...props }, ref) => {
    const spinnerOptions = ratio ? `ratio: ${ratio}` : ''

    return <div ref={ref} uk-spinner={spinnerOptions} {...props} />
  },
)