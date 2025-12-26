import React, { forwardRef } from 'react'

type MarkerProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Marker = forwardRef<HTMLAnchorElement, MarkerProps>(
  ({ ...props }, ref) => {
    return (
      <a
        ref={ref}
        uk-marker=""
        {...props}
      />
    )
  }
)