import { useEffect, useState } from 'react'

/**
 * مقدار را بعد از `delay` میلی‌ثانیه سکون برمی‌گرداند.
 * اگر کاربر سریع تایپ کند، تایمر قبلی کنسل می‌شود.
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
