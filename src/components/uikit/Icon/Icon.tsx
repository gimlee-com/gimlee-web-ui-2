import React, { forwardRef } from 'react'

type IconProps = {
  /** The name of the icon to display. */
  icon: string
  /** The size ratio of the icon. */
  ratio?: number
  /** The style variant of the icon. */
  variant?: 'link' | 'button' | 'overlay'
  /** If provided, the icon will be rendered as an anchor tag. */
  href?: string
} & React.HTMLAttributes<HTMLAnchorElement>

export const Icon = forwardRef<HTMLAnchorElement, IconProps>(
  (
    { icon, ratio, variant, href, className: customClassName, ...props },
    ref
  ) => {
    // Render as an anchor tag if `href` is provided, otherwise a span.
    const Tag: React.ElementType = href ? 'a' : 'span'

    const classNames = []
    if (variant) {
      classNames.push(`uk-icon-${variant}`)
    }
    if (customClassName) {
      classNames.push(customClassName)
    }

    // Construct the `uk-icon` attribute string from our props.
    const ukIconOptions = [`icon: ${icon}`]
    if (ratio) {
      ukIconOptions.push(`ratio: ${ratio}`)
    }
    const ukIconAttr = ukIconOptions.join('; ')

    return (
      <Tag
        ref={ref}
        className={classNames.length > 0 ? classNames.join(' ') : undefined}
        uk-icon={ukIconAttr}
        href={href}
        {...props}
      />
    )
  }
)