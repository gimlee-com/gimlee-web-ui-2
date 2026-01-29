import React, { forwardRef } from 'react'
import { useUIKit } from '../../../hooks/useUIkit'
import { useMergeRefs } from '../../../hooks/useMergeRefs'

type UploadProps = React.HTMLAttributes<HTMLDivElement> & {
  url?: string
  multiple?: boolean
  name?: string
  type?: string
  params?: object
  allow?: string
  mime?: string
  maxSize?: number
  concurrent?: number
  method?: string
  msgInvalidMime?: string
  msgInvalidName?: string
  clsDragover?: string
  abort?: Function
  beforeAll?: Function
  beforeSend?: Function
  complete?: Function
  completeAll?: Function
  error?: Function
  load?: Function
  loadEnd?: Function
  loadStart?: Function
  progress?: Function
  fail?: Function
}

export const Upload = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      children,
      url,
      multiple,
      name,
      type,
      params,
      allow,
      mime,
      maxSize,
      concurrent,
      method,
      msgInvalidMime,
      msgInvalidName,
      clsDragover,
      abort,
      beforeAll,
      beforeSend,
      complete,
      completeAll,
      error,
      load,
      loadEnd,
      loadStart,
      progress,
      fail,
      className: customClassName,
      ...props
    },
    ref
  ) => {
    const { ref: uikitRef } = useUIKit<any, HTMLDivElement>('upload', {
      url,
      multiple,
      name,
      type,
      params,
      allow,
      mime,
      maxSize,
      concurrent,
      method,
      msgInvalidMime,
      msgInvalidName,
      clsDragover,
      abort,
      beforeAll,
      beforeSend,
      complete,
      completeAll,
      error,
      load,
      loadEnd,
      loadStart,
      progress,
      fail,
    })

    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const mergedRef = useMergeRefs(uikitRef, ref)

    return (
      <div ref={mergedRef} className={classNames.join(' ') || undefined} {...props}>
        {children}
      </div>
    )
  }
)
