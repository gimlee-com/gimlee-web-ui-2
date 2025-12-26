import React, { forwardRef } from 'react'

type SectionVariant = 'default' | 'muted' | 'primary' | 'secondary'
type SectionSize = 'xsmall' | 'small' | 'large' | 'xlarge'
type SectionAxisSize =
  | 'xsmall-top'
  | 'xsmall-bottom'
  | 'small-top'
  | 'small-bottom'
  | 'medium-top'
  | 'medium-bottom'
  | 'large-top'
  | 'large-bottom'

type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Background/look variant */
  variant?: SectionVariant
  /** Uniform padding size */
  size?: SectionSize
  /** Axis-specific padding helpers from the docs (optional) */
  axisSize?: SectionAxisSize
  /** Prevent inverse color propagation for primary/secondary */
  preserveColor?: boolean
  /** Remove all padding (uses uk-padding-remove-vertical) */
  removePadding?: boolean
}

/** UIkit Section wrapper */
export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      children,
      className: customClassName,
      variant = 'default',
      size,
      axisSize,
      preserveColor,
      removePadding,
      ...props
    },
    ref
  ) => {
    const classNames = ['uk-section']

    if (variant) classNames.push(`uk-section-${variant}`)
    if (size) classNames.push(`uk-section-${size}`)
    if (axisSize) classNames.push(`uk-section-${axisSize}`)
    if (preserveColor) classNames.push('uk-preserve-color')
    if (removePadding) classNames.push('uk-padding-remove-vertical')
    if (customClassName) classNames.push(customClassName)

    return (
      <div ref={ref} className={classNames.join(' ')} {...props}>
        {children}
      </div>
    )
  }
)