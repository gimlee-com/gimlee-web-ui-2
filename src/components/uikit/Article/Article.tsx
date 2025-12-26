import React, { forwardRef } from 'react'

export const Article = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-article']
  if (customClassName) classNames.push(customClassName)
  return (
    <article ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </article>
  )
})

export const ArticleTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-article-title']
  if (customClassName) classNames.push(customClassName)
  return (
    <h1 ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </h1>
  )
})

export const ArticleMeta = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className: customClassName, ...props }, ref) => {
  const classNames = ['uk-article-meta']
  if (customClassName) classNames.push(customClassName)
  return (
    <p ref={ref} className={classNames.join(' ')} {...props}>
      {children}
    </p>
  )
})
