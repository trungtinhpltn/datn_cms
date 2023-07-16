import { useChatContext } from 'contexts/chat'
import { useEffect } from 'react'

export const useChatHistory = (enable: boolean) => {
  const { setIsChatHistory } = useChatContext()

  useEffect(() => {
    setIsChatHistory(enable)
    return () => setIsChatHistory(false)
  }, [])
}
