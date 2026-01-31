import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Image as UIKitImage, type ImageProps as UIKitImageProps } from '../uikit/Image/Image'
import styles from './Image.module.scss'

export interface ImageProps extends UIKitImageProps {
  placeholder?: React.ReactNode
  containerClassName?: string
  containerStyle?: React.CSSProperties
}

export const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      placeholder,
      className,
      containerClassName,
      containerStyle,
      onLoad,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const imageInternalRef = useRef<HTMLElement>(null)

    useEffect(() => {
      const el = imageInternalRef.current
      if (!el) return

      const handleLoad = () => {
        setIsLoaded(true)
      }

      el.addEventListener('load', handleLoad)
      
      if (el instanceof HTMLImageElement && el.complete) {
        handleLoad()
      }

      return () => {
        el.removeEventListener('load', handleLoad)
      }
    }, [])

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoaded(true)
      onLoad?.(event)
    }

    return (
      <div 
        ref={ref}
        className={`${styles.container} ${containerClassName || ''}`} 
        style={containerStyle}
      >
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              className={styles.placeholder}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              data-testid="image-placeholder-container"
            >
              {placeholder || (
                <div 
                  className={styles.defaultPlaceholder} 
                  data-testid="image-placeholder" 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <UIKitImage
          {...props}
          ref={imageInternalRef}
          className={`${className || ''} ${styles.image} ${
            isLoaded ? styles.loaded : styles.hidden
          }`}
          onLoad={handleLoad}
        />
      </div>
    )
  }
)
