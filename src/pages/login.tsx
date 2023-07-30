import { ajvResolver } from '@hookform/resolvers/ajv'
import { fullFormats } from 'ajv-formats/dist/formats'
import Illustration from 'assets/images/illustration.svg'
import Logo from 'assets/images/logo.svg'
import InputPassword from 'components/Form/InputPassword'
import InputText from 'components/Form/InputText'
import { useAuth } from 'contexts/auth'
import { _t } from 'contexts/i18n'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

type Inputs = {
  username: string
  password: string
}

export default function LoginPage() {
  const { signIn, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: ajvResolver({}, { formats: fullFormats }),
    mode: 'onChange'
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = (dataInput: Inputs) => {
    signIn(dataInput)
  }
  return (
    <div className="login">
      <div className="container h-[94vh] sm:px-10">
        <div className="block grid-cols-2 gap-4 xl:grid">
          <div className="hidden min-h-screen flex-col xl:flex">
            <a href="" className="-intro-x flex items-center pt-5">
              <img className="w-6" src={Logo} />
              <span className="ml-3 text-lg text-white">CMS</span>
            </a>
            <div className="my-auto">
              <img className="-intro-x -mt-16 w-1/2" src={Illustration} />
              <div className="-intro-x mt-10 text-4xl font-medium leading-tight text-white">
                CMS
              </div>
            </div>
          </div>
          <div className="my-10 flex h-screen py-5 xl:my-0 xl:h-auto xl:py-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="m-auto w-full overflow-hidden rounded-md bg-white px-5 py-8 shadow-md dark:bg-darkmode-600 sm:w-3/4 sm:px-8 lg:w-2/4 xl:ml-20 xl:w-auto xl:bg-transparent xl:p-1 xl:shadow-none"
            >
              <h2 className="intro-x text-center text-2xl font-bold xl:text-left xl:text-3xl">
                {_t('login')}
              </h2>
              <div className="intro-x mt-8">
                <InputText
                  register={register('username')}
                  placeholder="Tài khoản"
                  error={errors.username}
                  classNameInput="intro-x login__input form-control py-3 px-4 block"
                />
                <InputPassword
                  register={register('password')}
                  placeholder="Mật khẩu"
                  error={errors.password}
                  classNameInput="intro-x login__input form-control py-3 px-4 block mt-4"
                />
              </div>
              {/* <div className="intro-x mt-4 flex justify-end text-xs text-slate-600 dark:text-slate-500 sm:text-sm">
                <Link to="/forgetPassword">{_t('login.forgetpassword')}</Link>
              </div> */}
              <div className="intro-x mt-5 text-center xl:mt-8 xl:text-left">
                <button className="btn btn-primary w-full py-3 px-4 align-top xl:mr-3 xl:w-32">
                  {_t('login')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
