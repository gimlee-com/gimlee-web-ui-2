import React, { forwardRef, useMemo } from 'react'

type LeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  fill?: string
  media?: number | string
}

export const Leader = forwardRef<HTMLDivElement, LeaderProps>(
  ({ children, fill, media, className: customClassName, ...props }, ref) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const leaderOptions = useMemo(() => {
      const opts: string[] = []
      if (fill) opts.push(`fill: ${fill}`)
      if (media !== undefined) opts.push(`media: ${media}`)
      return opts.join('; ')
    }, [fill, media])

    return (
      <div
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-leader={leaderOptions || ''}
        {...props}
      >
        {children}
      </div>
    )
  }
)
