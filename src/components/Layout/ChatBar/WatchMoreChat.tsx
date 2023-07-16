import Icon from 'components/Icon'
import { useState } from 'react'

// ** Import Type
import type { ChatItemType } from '.'
import ChatItem from './ChatItem'

interface WatchMoreChatItems {
  listChatItems: ChatItemType[]
  handleRemoveDisplayChatItem: (item: ChatItemType) => void
  openChatDetail: (item: ChatItemType) => void
}

export default function WatchMoreChat(props: WatchMoreChatItems) {
  // Declare variables
  const [showItem, setShowItem] = useState(false)
  const { listChatItems, handleRemoveDisplayChatItem, openChatDetail } = props

  // declare function
  const renderListChatItems = () => {
    return (
      <div className="absolute right-0 top-0 flex max-h-[414px] translate-y-[calc(-100%-6px)] flex-col space-y-[6px] overflow-y-auto">
        {listChatItems.map((item) => (
          <ChatItem
            {...{ item, handleRemoveDisplayChatItem, openChatDetail }}
            key={item.id}
          />
        ))}
      </div>
    )
  }

  if (!listChatItems.length) return null
  return (
    <div
      className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-primary-shade"
      onClick={() => setShowItem(!showItem)}
    >
      <Icon
        iconName="ChevronUp"
        className={`h-6 w-6 text-white transition-all ${
          showItem ? 'rotate-180' : 'rotate-0'
        }`}
      />
      {showItem ? renderListChatItems() : ''}
    </div>
  )
}
