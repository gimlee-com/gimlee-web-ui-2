import { forwardRef } from 'react'
import { Drop, type DropProps } from '../Drop/Drop'

type DropbarProps = DropProps & {
  variant?: 'top' | 'bottom' | 'left' | 'right'
  large?: boolean
}

export const Dropbar = forwardRef<HTMLDivElement, DropbarProps>(
  ({ children, variant = 'top', large, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-dropbar']
    if (variant) classNames.push(`uk-dropbar-${variant}`)
    if (large) classNames.push('uk-dropbar-large')
    if (customClassName) classNames.push(customClassName)

    // Default options for dropbar if not provided
    const stretch = props.stretch ?? (variant === 'top' || variant === 'bottom' ? 'x' : 'y')
    const pos = props.pos ?? (variant === 'top' ? 'bottom-left' : variant === 'bottom' ? 'top-left' : variant === 'left' ? 'right-top' : 'left-top')

    return (
      <Drop
        ref={ref}
        className={classNames.join(' ')}
        stretch={stretch}
        pos={pos}
        {...props}
      >
        {children}
      </Drop>
    )
  }
)
