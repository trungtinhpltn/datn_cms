import classNames from 'classnames'
import InputToggle from 'components/Form/InputToggle'
import Icon from 'components/Icon'
import { _t } from 'contexts/i18n'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { Bell } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

export interface INotificationsProps {}

export default function Notifications(props: INotificationsProps) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useOnClickOutside(ref, () => setShow(false))
  const navigate = useNavigate()

  return (
    <div className="intro-x dropdown mr-4 sm:mr-6">
      <div
        className="dropdown-toggle notification notification--bullet cursor-pointer"
        role="button"
        aria-expanded="false"
        data-tw-toggle="dropdown"
        onClick={() => setShow(!show)}
      >
        <Bell className="notification__icon dark:text-slate-500" />
      </div>
      <div
        className={classNames(
          'notification-content dropdown-menu pt-2',
          show && 'show'
        )}
        ref={ref}
      >
        <div className="notification-content__box dropdown-content !p-4">
          <div className="notification-content__title !mb-3">
            <InputToggle
              className="!mr-auto"
              onChange={() => console.log('notification')}
              label={_t('receive.notification.new')}
            />
          </div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex cursor-pointer items-center space-x-1 hover:text-blue-500">
              <Icon iconName="Check" className="h-4 w-4" />
              <p>{_t('notification.read')}</p>
            </div>
            <p
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                navigate('/notification')
                setShow(false)
              }}
            >
              {_t('notification.all')}
            </p>
          </div>
          <div className="scrollbar-hidden h-80 overflow-y-scroll">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="relative flex cursor-pointer items-center rounded-lg px-1 transition-all duration-300 ease-in-out hover:bg-[#f7f7f7] dark:hover:bg-[#232d45]"
              >
                <Icon iconName="BellRing" size={70} />
                <div className="ml-2 overflow-hidden">
                  <div className="flex items-center">
                    <a href="#" className="mr-5 truncate font-medium">
                      Russell Crowe
                    </a>
                    <div className="ml-auto whitespace-nowrap text-xs text-slate-400">
                      01:10 PM
                    </div>
                  </div>
                  <div className="mt-0.5 w-full truncate text-slate-500">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem
                  </div>
                </div>
              </div>
            ))}
            {/* <NotificationEmpty /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
