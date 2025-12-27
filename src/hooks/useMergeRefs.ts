import { useCallback } from 'react'

/**
 * A hook that merges multiple refs into a single memoized ref callback.
 * Useful when you need to use an internal ref but also support a forwarded ref.
 *
 * @param refs The refs to merge.
 * @returns A ref callback that updates all provided refs.
 */
export function useMergeRefs<T>(...refs: (React.Ref<T> | undefined | null)[]) {
  return useCallback(
    (value: T | null) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(value)
        } else if (ref != null) {
          ref.current = value
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  )
}
