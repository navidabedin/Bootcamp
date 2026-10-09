import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

/**
 * useState + همگام‌سازی خودکار با localStorage.
 * مقدار اولیه فقط یک بار (lazy initializer) از استوریج خوانده می‌شود.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorage(key, initialValue))

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
