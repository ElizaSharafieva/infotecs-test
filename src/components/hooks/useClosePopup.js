import { useEffect, useRef, useCallback } from 'react'

function useClosePopup(onClose) {
  const popupRef = useRef(null)
  const buttonRef = useRef(null)

  const handleClickOutside = useCallback((event) => {
    if (
      popupRef.current && 
      !popupRef.current.contains(event.target) &&
      buttonRef.current && 
      !buttonRef.current.contains(event.target)
    ) {
      onClose()
    }
  }, [onClose])

  const handleEscapePress = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapePress)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapePress)
    }
  }, [handleClickOutside, handleEscapePress])

  return { popupRef, buttonRef }
}

export default useClosePopup