import React, { forwardRef, useMemo } from 'react'

type VideoAutoplay = boolean | 'inview' | 'hover'

type VideoProps = React.AllHTMLAttributes<HTMLElement> & {
  autoplay?: VideoAutoplay
  restart?: boolean
  hoverTarget?: string
  tag?: React.ElementType
}

export const Video = forwardRef<HTMLElement, VideoProps>(
  ({ autoplay = true, restart, hoverTarget, tag: Tag = 'video', className: customClassName, ...props }, ref) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const videoOptions = useMemo(() => {
      const opts: string[] = []
      if (autoplay !== true) opts.push(`autoplay: ${autoplay}`)
      if (restart !== undefined) opts.push(`restart: ${restart}`)
      if (hoverTarget) opts.push(`hover-target: ${hoverTarget}`)
      return opts.join('; ')
    }, [autoplay, restart, hoverTarget])

    return (
      <Tag
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-video={videoOptions || ''}
        {...props}
      />
    )
  }
)
