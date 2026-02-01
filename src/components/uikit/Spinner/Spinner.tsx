import React, { forwardRef } from 'react'
import { useUIKit } from '../../../hooks/useUIkit'
import { useMergeRefs } from '../../../hooks/useMergeRefs'

type SpinnerProps = {
  ratio?: number
} & React.HTMLAttributes<HTMLDivElement>

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ ratio, ...props }, ref) => {
    const { ref: uikitRef } = useUIKit<any, HTMLDivElement>('spinner' as any, {
      ratio,
    })

    const mergedRef = useMergeRefs(uikitRef, ref)

    return <div ref={mergedRef} uk-spinner="" role="status" {...props} />
  },
)