import classNames from 'classnames'
import Dropdown from 'components/Dropdown'
import Icon from 'components/Icon'
import { useTabPaneContext } from 'contexts/tabPane'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function TabPane() {
  const local = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(local.pathname)
  const { listTabPane, setListTabPane } = useTabPaneContext()

  useEffect(() => {
    setActiveTab(local.pathname)
  }, [local.pathname])

  return (
    <nav
      aria-label="TabPane"
      className={classNames(
        '-intro-x mr-auto ml-[268px] -mt-4 flex h-full flex-1 justify-start',
        { '!mt-0 !h-0 !w-0 !overflow-hidden': !listTabPane.length }
      )}
    >
      <ul className="flex h-[48px] space-x-[2px]" role="tablist">
        {listTabPane.slice(0, 6).map((i) => (
          <li
            key={i.url}
            className={classNames(
              'relative flex h-10 items-center justify-center space-x-2 self-end rounded-lg rounded-b-none border-[1px] border-white/[0.08] border-b-transparent pl-4 pr-8 align-middle text-dark transition-colors',
              activeTab === i.url
                ? 'bg-slate-100 dark:bg-darkmode-700 dark:text-[#ddd]'
                : 'bg-primary/70 text-light'
            )}
            role="presentation"
          >
            <Icon iconName="FileSignature" className="h-4 w-4" />

            <button
              className="w-32 truncate text-left"
              onClick={() => {
                setActiveTab(i.url)
                navigate(i.url)
              }}
            >
              {i.title}
            </button>
            <Icon
              iconName="X"
              className="absolute right-3 top-[11px] h-4 w-4 cursor-pointer rounded-full p-[1px] hover:bg-slate-500/50"
              onClick={() => {
                if (i.url === activeTab) {
                  navigate('/tickets')
                }
                const newListTab = listTabPane.filter(
                  (item) => item.url !== i.url
                )
                setListTabPane(newListTab)
              }}
            />
          </li>
        ))}
        <li className="relative flex h-10 justify-center self-end px-1 align-middle text-light">
          {listTabPane.length > 6 && (
            <Dropdown
              className="text-dark"
              forceBtnClassName="bg-transparent hover:scale-110 mt-2"
              onSelect={(data) => {
                const newTab = {
                  title: `${data.title}`,
                  url: `${data.id}`,
                  ticketId: `${data.id}`
                }
                const newListTab = listTabPane.filter(
                  (i) => i.url !== `${data.id}`
                )
                newListTab.splice(5, 0, newTab)
                setListTabPane([...newListTab])
                navigate(`${data.id}`)
              }}
              title={
                <Icon iconName="MoreVertical" className="h-5 w-5 text-light" />
              }
              items={listTabPane.slice(6)?.map((item) => ({
                id: item.url,
                title: item.title,
                ticketId: item.ticketId
              }))}
            ></Dropdown>
          )}
        </li>
      </ul>
    </nav>
  )
}
