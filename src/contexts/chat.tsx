import { createContext, useContext, useState } from 'react'

export const ChatContext = createContext<{
  isChatHistory: boolean
  setIsChatHistory: (a: boolean) => void
}>({
  isChatHistory: false,
  setIsChatHistory: function (): void {
    throw new Error('Function not implement.')
  }
})

export const useChatContext = () => useContext(ChatContext)

export const ChatProvider = ({ children }: React.PropsWithChildren) => {
  const [isChatHistory, setIsChatHistory] = useState<boolean>(false)

  return (
    <ChatContext.Provider
      value={{
        isChatHistory,
        setIsChatHistory
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
