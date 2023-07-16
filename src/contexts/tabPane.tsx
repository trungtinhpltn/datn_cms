import { createContext, useContext, useState } from 'react'

interface ITabContextProps {
  listTabPane: Array<TabPane>
  setListTabPane: React.Dispatch<React.SetStateAction<TabPane[]>>
}

type TabPane = {
  title: string
  url: string
  ticketId: string
}

const TabPaneContext = createContext<ITabContextProps>({
  listTabPane: [],
  setListTabPane: function (): void {
    throw new Error('Function not implemented.')
  }
})

export const useTabPaneContext = () => useContext(TabPaneContext)

export const TabPane = ({ children }: React.PropsWithChildren) => {
  const [listTabPane, setListTabPane] = useState<Array<TabPane>>([])
  return (
    <TabPaneContext.Provider
      value={{
        listTabPane,
        setListTabPane
      }}
    >
      {children}
    </TabPaneContext.Provider>
  )
}
