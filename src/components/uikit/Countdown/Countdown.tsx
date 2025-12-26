import React, { forwardRef, useMemo } from 'react'

type CountdownProps = React.HTMLAttributes<HTMLDivElement> & {
  date: string
  reload?: boolean
}

export const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  ({ children, date, reload, className: customClassName, ...props }, ref) => {
    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const countdownOptions = useMemo(() => {
      const opts: string[] = []
      if (date) opts.push(`date: ${date}`)
      if (reload !== undefined) opts.push(`reload: ${reload}`)
      return opts.join('; ')
    }, [date, reload])

    return (
      <div
        ref={ref}
        className={classNames.join(' ') || undefined}
        uk-countdown={countdownOptions}
        role="timer"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const CountdownDays = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = ['uk-countdown-number', 'uk-countdown-days']
    if (customClassName) classNames.push(customClassName)
    return <div ref={ref} className={classNames.join(' ')} {...props} />
  }
)

export const CountdownHours = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = ['uk-countdown-number', 'uk-countdown-hours']
    if (customClassName) classNames.push(customClassName)
    return <div ref={ref} className={classNames.join(' ')} {...props} />
  }
)

export const CountdownMinutes = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = ['uk-countdown-number', 'uk-countdown-minutes']
    if (customClassName) classNames.push(customClassName)
    return <div ref={ref} className={classNames.join(' ')} {...props} />
  }
)

export const CountdownSeconds = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className: customClassName, ...props }, ref) => {
    const classNames = ['uk-countdown-number', 'uk-countdown-seconds']
    if (customClassName) classNames.push(customClassName)
    return <div ref={ref} className={classNames.join(' ')} {...props} />
  }
)

export const CountdownSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-countdown-separator']
    if (customClassName) classNames.push(customClassName)
    return <div ref={ref} className={classNames.join(' ')} {...props}>{children || ':'}</div>
  }
)

export const CountdownLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className: customClassName, ...props }, ref) => {
    const classNames = ['uk-countdown-label']
    if (customClassName) classNames.push(customClassName)
    return <div ref={ref} className={classNames.join(' ')} {...props}>{children}</div>
  }
)
