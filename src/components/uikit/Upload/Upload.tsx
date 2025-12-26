import React, { forwardRef } from 'react'
import { useUIKit } from '../../../hooks/useUIkit'

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
      'msg-invalid-mime': msgInvalidMime,
      'msg-invalid-name': msgInvalidName,
      'cls-dragover': clsDragover,
      abort,
      'before-all': beforeAll,
      'before-send': beforeSend,
      complete,
      'complete-all': completeAll,
      error,
      load,
      'load-end': loadEnd,
      'load-start': loadStart,
      progress,
      fail,
    })

    const classNames = []
    if (customClassName) classNames.push(customClassName)

    const mergeRefs = (node: HTMLDivElement) => {
      uikitRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <div ref={mergeRefs} className={classNames.join(' ') || undefined} {...props}>
        {children}
      </div>
    )
  }
)
