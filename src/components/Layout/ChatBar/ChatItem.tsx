import Icon from 'components/Icon'

// Import Type
import type { ChatItemType } from './index'

interface ChatItemProps {
  item: ChatItemType
  handleRemoveDisplayChatItem: (item: ChatItemType) => void
  openChatDetail: (item: ChatItemType) => void
}

export default function ChatItem(props: ChatItemProps) {
  const { handleRemoveDisplayChatItem, item, openChatDetail } = props
  const userName = item.userName
  const getDisplayUsername = (): string => {
    if (userName && userName.length > 18) return `${userName.slice(0, 18)}...`
    return userName || ''
  }

  return (
    <div
      className="relative flex w-52 cursor-pointer items-center justify-between space-x-2 rounded !bg-primary-shade p-2"
      onClick={() => openChatDetail(item)}
    >
      <div className="flex space-x-2">
        <Icon iconName="Facebook" className="h-4 w-4 text-white" />
        <div className="text-sm text-white">{getDisplayUsername()}</div>
      </div>

      <div
        className="box-content h-4 w-4 items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.3]"
        onClick={(e) => {
          e.stopPropagation()
          handleRemoveDisplayChatItem(item)
        }}
      >
        <Icon iconName="X" className="h-4 w-4 text-white" />
      </div>
    </div>
  )
}
