import React, { forwardRef, useMemo } from 'react'

type DropdownProps = React.PropsWithChildren<{
  large?: boolean
  mode?: 'click' | 'hover'
  pos?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'right-top'
    | 'right-center'
    | 'right-bottom'
  offset?: number
  flip?: boolean
  shift?: boolean
}> &
  React.HTMLAttributes<HTMLDivElement>

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    { children, large, className: customClassName, mode, pos, offset, flip, shift, ...props },
    ref,
  ) => {
    const classNames = ['uk-dropdown']
    if (large) classNames.push('uk-dropdown-large')
    if (customClassName) classNames.push(customClassName)

    const dropdownOptions = useMemo(() => {
      const options: string[] = []
      if (mode) options.push(`mode: ${mode}`)
      if (pos) options.push(`pos: ${pos}`)
      if (offset !== undefined) options.push(`offset: ${offset}`)
      if (flip !== undefined) options.push(`flip: ${flip}`)
      if (shift !== undefined) options.push(`shift: ${shift}`)
      
      // The user can still pass other options via props
      const anyProps = props as any
      for (const key in anyProps) {
        if (key.startsWith('uk-')) {
          options.push(String(anyProps[key]))
        }
      }
      
      return options.join(';')
    }, [mode, pos, offset, flip, shift, props])

    const otherProps = { ...props }


    return (
      <div
        ref={ref}
        className={classNames.join(' ')}
        uk-dropdown={dropdownOptions}
        {...otherProps}
      >
        {children}
      </div>
    )
  },
)