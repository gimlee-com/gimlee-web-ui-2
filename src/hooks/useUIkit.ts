import { useRef, useEffect, useState } from 'react'
import UIkit from 'uikit'

// A mapping of component names to their constructor types
type UIkitComponent = keyof typeof UIkit

/**
 * A generic hook to manage the lifecycle of a UIkit JavaScript component.
 *
 * @param componentName The name of the UIkit component (e.g., 'tooltip', 'sticky').
 * @param options The options object for the UIkit component.
 * @returns An object containing a ref to attach to the element and the UIkit component instance.
 */
export const useUIKit = <
  C, // C is for the UIkit Component instance type
  E extends HTMLElement = HTMLElement // E is for the DOM Element type
>(
  componentName: UIkitComponent,
  options?: object
) => {
  const elementRef = useRef<E>(null)
  // We use state to hold the instance so that components re-render when it's available.
  const [instance, setInstance] = useState<C | null>(null)

  // Memoize the options object by stringifying it.
  // We include function bodies in the stringification to ensure that if a callback
  // changes, the component is re-initialized.
  const optionsString = JSON.stringify(options ?? {}, (_key, value) => {
    if (typeof value === 'function') {
      return value.toString()
    }
    return value
  })

  useEffect(() => {
    const element = elementRef.current

    if (element) {
      // @ts-expect-error - We are dynamically accessing the UIkit component constructor.
      const uikitComponent = UIkit[componentName](element, options)
      setInstance(uikitComponent)

      // The crucial cleanup step: destroy the UIkit instance when the React component unmounts.
      return () => {
        if (uikitComponent?.$destroy) {
          uikitComponent.$destroy()
        }
      }
    }
    // We disable the exhaustive-deps rule because we are intentionally using a stringified
    // version of the options object to prevent infinite re-renders.
    // We use the actual options object in the constructor call to ensure functions are preserved.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentName, optionsString]) // We now depend on the stable, stringified options

  return { ref: elementRef, instance }
}