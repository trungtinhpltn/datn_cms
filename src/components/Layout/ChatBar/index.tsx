import ChatContent from 'pages/Chat/components/ChatContent'
import ChatSideInfo from 'pages/Chat/components/ChatSideInfor'
import { useEffect, useState } from 'react'

import ChatItem from './ChatItem'
import WatchMoreChat from './WatchMoreChat'

interface ChatBarProps {}

export interface ChatItemType {
  id: number
  userName: string
  source: string
}

export default function ChatBar(props: ChatBarProps) {
  const [listChatItems, setListChatItems] = useState<ChatItemType[]>([
    {
      id: 1,
      userName: 'Vương Trang Vương Trang Vương Trang Vương Trang 1',
      source: 'Facebook'
    },
    { id: 2, userName: 'Vương Trang 2', source: 'Facebook' },
    { id: 3, userName: 'Vương Trang 3', source: 'Facebook' },
    { id: 4, userName: 'Vương Trang 4', source: 'Facebook' },
    { id: 5, userName: 'Vương Trang 5', source: 'Facebook' },
    { id: 6, userName: 'Vương Trang 6', source: 'Facebook' },
    { id: 7, userName: 'Vương Trang 7', source: 'Facebook' },
    { id: 8, userName: 'Vương Trang 8', source: 'Facebook' },
    { id: 9, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 10, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 11, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 12, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 13, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 14, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 15, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 16, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 17, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 18, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 19, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 20, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 21, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 22, userName: 'Vương Trang 9', source: 'Facebook' },
    { id: 23, userName: 'Vương Trang 9', source: 'Facebook' }
  ])

  const [activeItem, setActiveItem] = useState<ChatItemType | null>()

  const handleRemoveDisplayChatItem = (chatItem: ChatItemType) => {
    const newList = listChatItems.filter((item) => chatItem.id !== item.id)
    setListChatItems(newList)
  }

  useEffect(() => {
    if (activeItem) {
      document.body.classList.add('!overflow-hidden')
    } else {
      document.body.classList.remove('!overflow-hidden')
    }
  }, [activeItem])

  const openChatDetail = (chatItem: ChatItemType) => {
    setActiveItem(chatItem)
  }

  const closeChatDetail = (e: any) => {
    if (e.target.classList.contains('chat-detail-popup')) setActiveItem(null)
  }

  // Render Function
  const renderActiceChatItem = () => {
    if (!activeItem) return null
    return (
      <div
        className="chat-detail-popup fixed top-0 left-0 z-[200] h-[100vh] w-[100vw] bg-black/20"
        onClick={closeChatDetail}
      >
        <div className="ml-auto flex h-[100%] w-[900px] max-w-[100%] bg-white">
          <ChatContent />
          <ChatSideInfo />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Chat Bar */}
      <div className="chat-detail-popup fixed left-[282px] bottom-2 flex space-x-2">
        {listChatItems.slice(0, 4).map((item) => (
          <ChatItem
            {...{ item, handleRemoveDisplayChatItem, openChatDetail }}
            key={item.id}
          />
        ))}
        <WatchMoreChat
          {...{
            listChatItems: listChatItems.slice(4),
            handleRemoveDisplayChatItem,
            openChatDetail
          }}
        />
      </div>
      {/* Chat Detail  */}
      {renderActiceChatItem()}
    </>
  )
}
