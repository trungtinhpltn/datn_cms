import { useEffect } from 'react'

export const useChatLayout = () => {
  useEffect(() => {
    document.body.classList.add('chat-wrapper')
    return () => document.body.classList.remove('chat-wrapper')
  }, [])
}
