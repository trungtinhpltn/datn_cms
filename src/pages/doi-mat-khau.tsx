import { yupResolver } from '@hookform/resolvers/yup'
import Illustration from 'assets/images/illustration.svg'
import Logo from 'assets/images/logo.svg'
import InputPassword from 'components/Form/InputPassword'
import {
  validateConfirmPassword,
  validateDifferentPassword,
  validateRequired
} from 'contants/validate'
import { useAuth } from 'contexts/auth'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import authenticationAPI from 'services/authentication.service'
import { toastError, toastSuccess } from 'utils/toast'
import * as yup from 'yup'

export type ChangePasswordInputs = {
  oldpassword: string
  newpassword: string
  confirmnewpassword: string
}

const schema = yup.object({
  oldpassword: validateRequired(' mật khẩu cũ'),
  newpassword: validateDifferentPassword('oldpassword'),
  confirmnewpassword: validateConfirmPassword('newpassword')
})

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      oldpassword: '',
      newpassword: '',
      confirmnewpassword: ''
    },
    mode: 'onChange'
  })
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const onSubmit = async (data: ChangePasswordInputs) => {
    changePasswordMutate.mutate({ newPassword: data?.newpassword })
  }

  const changePasswordMutate = useMutation({
    mutationFn: (data: any) =>
      authenticationAPI.changePassword(user?.id || -1, data),
    onSuccess: () => {
      toastSuccess('Đổi mật khẩu thành công.')
      signOut()
      navigate('/')
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  useEffect(() => {
    document.body.classList.add('login')
    return () => document.body.classList.remove('login')
  })

  return (
    <div className="container h-[94vh] sm:px-10">
      <div className="block grid-cols-2 gap-4 xl:grid">
        <div className="hidden min-h-screen flex-col xl:flex">
          <a href="/" className="-intro-x flex items-center pt-5">
            <img className="w-6" src={Logo} />
            <span className="ml-3 text-lg text-white">MTFood</span>
          </a>
          <div className="my-auto">
            <img className="-intro-x -mt-16 w-1/2" src={Illustration} />
          </div>
        </div>
        <div className="my-10 flex h-screen py-5 xl:my-0 xl:h-auto xl:py-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-auto w-full max-w-[500px] overflow-hidden rounded-md bg-white px-5 py-8 pr-20 shadow-md dark:bg-darkmode-600 xl:bg-transparent xl:pl-10 xl:shadow-none"
          >
            <h2 className="intro-x text-center text-2xl font-bold xl:text-left xl:text-3xl">
              Đổi mật khẩu
            </h2>
            <div className="mt-8">
              <InputPassword
                register={register('oldpassword')}
                placeholder="Mật khẩu cũ"
                error={errors.oldpassword}
                classNameInput="login__input form-control py-3 px-4 block mt-4 w-full"
              />
              <InputPassword
                register={register('newpassword')}
                placeholder="Mật khẩu mới"
                error={errors.newpassword}
                classNameInput="login__input form-control py-3 px-4 block mt-4"
              />
              <InputPassword
                register={register('confirmnewpassword')}
                placeholder="Xác nhận lại mật khẩu mới"
                error={errors.confirmnewpassword}
                classNameInput="login__input form-control py-3 px-4 block mt-4"
              />
              <div className="mt-5 text-center xl:mt-8">
                <button className="btn btn-primary w-full px-4 py-3 align-top xl:w-32">
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
