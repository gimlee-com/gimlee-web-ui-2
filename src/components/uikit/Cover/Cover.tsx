import React, { forwardRef, useMemo } from 'react'

type CoverProps = React.AllHTMLAttributes<HTMLElement> & {
  automute?: boolean
  width?: number
  height?: number
  tag?: React.ElementType
}

/**
 * Cover component to be used on img, video or iframe.
 */
export const Cover = forwardRef<HTMLElement, CoverProps>(
  ({ automute, width, height, tag: Tag = 'img', className: customClassName, ...props }, ref) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const coverOptions = useMemo(() => {
      const opts: string[] = []
      if (automute !== undefined) opts.push(`automute: ${automute}`)
      if (width !== undefined) opts.push(`width: ${width}`)
      if (height !== undefined) opts.push(`height: ${height}`)
      return opts.join('; ')
    }, [automute, width, height])

    return (
      <Tag
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-cover={coverOptions || ''}
        {...props}
      />
    )
  }
)

export const CoverContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-cover-container']
    if (customClassName) classNames.push(customClassName)

    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)
