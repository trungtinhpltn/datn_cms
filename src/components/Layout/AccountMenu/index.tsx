import classNames from 'classnames'
import Avatar from 'components/Avatar'
import { useAuth } from 'contexts/auth'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { ToggleRight, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { getMedia2 } from 'utils'

export default function AccountMenu() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useOnClickOutside(ref, () => setShow(false))
  const navigate = useNavigate()
  const { signOut, user } = useAuth()
  return (
    <div className="intro-x dropdown h-8 w-8">
      <div
        className="dropdown-toggle image-fit zoom-in h-8 w-8 scale-110 overflow-hidden rounded-full shadow-lg"
        role="button"
        aria-expanded="false"
        data-tw-toggle="dropdown"
        onClick={() => setShow(!show)}
      >
        <Avatar
          src={user?.Employee?.image ? getMedia2(user?.Employee.image) : ''}
        />
      </div>
      <div
        className={classNames('dropdown-menu w-56', show && 'show')}
        ref={ref}
      >
        <ul className="dropdown-content bg-primary/80 text-white before:absolute before:inset-0 before:z-[-1] before:block before:rounded-md before:bg-black">
          <li className="p-2">
            <div className="font-medium">{user?.email}</div>
            <div className="mt-0.5 text-xs text-white/60 dark:text-slate-500">
              {user?.name}
            </div>
          </li>
          <li>
            <hr className="dropdown-divider border-white/[0.08]" />
          </li>
          <li>
            <a
              className="dropdown-item cursor-pointer hover:bg-white/5"
              onClick={() => {
                navigate('/doi-mat-khau')
                setShow(false)
              }}
            >
              <User className="mr-2 h-4 w-4" /> Đối mật khẩu
            </a>
          </li>
          <li>
            <hr className="dropdown-divider border-white/[0.08]" />
          </li>
          <li>
            <a
              onClick={() => signOut()}
              className="dropdown-item cursor-pointer hover:bg-white/5"
            >
              <ToggleRight className="mr-2 h-4 w-4" />
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
