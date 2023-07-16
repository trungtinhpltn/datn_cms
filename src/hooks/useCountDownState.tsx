import { useEffect, useState } from 'react'

type Options = {
  storage?: Storage
  key?: string
}
const useCountDownState = (
  initValue?: number,
  options?: Options
): [number, (count: number) => void] => {
  const { storage = localStorage, key = 'countdown' } = options || {}

  const storedTime = Number(storage.getItem(key))
  const initSecond = storedTime
    ? (new Date(Number(storedTime)).getTime() - new Date().getTime()) / 1000
    : initValue || 0
  const [count, setCount] = useState<number>(
    Math.max(Math.round(initSecond), 0)
  )

  const setCountState = (c: number) => {
    storage.setItem(key, String(new Date().getTime() + c * 1000))
    setCount(c)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preCount) => (preCount > 0 ? preCount - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return [count, setCountState]
}

export default useCountDownState
