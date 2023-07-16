import logoError from 'assets/images/error-illustration.svg'
import { _t } from 'contexts/i18n'
import { useNavigate } from 'react-router'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className="overflow-hidden">
      {/* BEGIN: Error Page */}
      <div className="error-page flex h-screen flex-col items-center justify-center text-center lg:flex-row lg:text-left">
        <div className="-intro-x lg:mr-20">
          <img
            alt="Midone - HTML Admin Template"
            className="h-48 lg:h-auto"
            src={logoError}
          />
        </div>
        <div className="mt-10 text-white lg:mt-0">
          <div className="intro-x text-8xl font-medium">404</div>
          <div className="intro-x mt-5 text-xl font-medium lg:text-3xl">
            {_t('errorpage.title')}
          </div>
          <div className="intro-x mt-3 text-lg">{_t('errorpage.content')}</div>
          <button
            className="intro-x btn mt-10 border-white py-3 px-4 text-white dark:border-darkmode-400 dark:text-slate-200"
            onClick={() => navigate('/')}
          >
            {_t('errorpage.button')}
          </button>
        </div>
      </div>
      {/* END: Error Page */}
    </div>
  )
}

export default ErrorPage
