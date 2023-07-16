// import '@fullcalendar/core/vdom'
import 'assets/js/app'

import AuthProvider from 'contexts/auth'
import { GlobalProvider } from 'contexts/global'
import I18nProvider from 'contexts/i18n'
import { MenuProvider } from 'contexts/menu'
import { PopupProvider } from 'contexts/popup'
import QueryClientProvider from 'contexts/queryClient'
import { TabPane } from 'contexts/tabPane'
import { ThemeProvider } from 'contexts/theme'
import { RouterProvider } from 'react-router-dom'
import router from 'routers'

function App() {
  return (
    <I18nProvider>
      <QueryClientProvider>
        <TabPane>
          <AuthProvider>
            <GlobalProvider>
              <ThemeProvider>
                <PopupProvider>
                  <MenuProvider>
                    <RouterProvider router={router} />;
                  </MenuProvider>
                </PopupProvider>
              </ThemeProvider>
            </GlobalProvider>
          </AuthProvider>
        </TabPane>
      </QueryClientProvider>
    </I18nProvider>
  )
}

export default App
