import 'react-toastify/dist/ReactToastify.css'
import './assets/css/app.css'
import './assets/css/custom.css'
import 'services/axiosClient'

import App from 'App'
import { bootstrap } from 'common/bootstrap'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
bootstrap()

root.render(
  <>
    <ToastContainer
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <App />
  </>
)
