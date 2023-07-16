import classnames from 'classnames'
import type { IconsName } from 'common/common.type'
import Icon from 'components/Icon'
import { Loader2 } from 'lucide-react'
import type { MouseEventHandler, ReactNode } from 'react'

const SIZE_VARIANTS = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg'
}

const ICON_SIZE_VARIANTS = {
  sm: 12,
  md: 16,
  lg: 20
}

const COLOR_VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  warning: 'btn-warning',
  pending: 'btn-pending',
  danger: 'btn-danger',
  dark: 'btn-dark',
  transparent: 'bg-transparent'
}

const OUTLINE_VARIANTS = {
  primary: 'btn-outline-primary',
  secondary: 'btn-outline-secondary',
  success: 'btn-outline-success',
  warning: 'btn-outline-warning',
  pending: 'btn-outline-pending',
  danger: 'btn-outline-danger',
  dark: 'btn-outline-dark',
  transparent: 'bg-transparent'
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  size?: keyof typeof SIZE_VARIANTS
  color?: keyof typeof COLOR_VARIANTS
  className?: string
  outline?: boolean
  loading?: boolean
  disable?: boolean
  iconName?: IconsName
  iconClassName?: string
  disableClassName?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  children,
  size = 'md',
  color = 'primary',
  className,
  outline = false,
  disable = false,
  loading = false,
  disableClassName = '',
  iconName,
  iconClassName,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classnames(
        'btn px-5',
        outline ? OUTLINE_VARIANTS[color] : COLOR_VARIANTS[color],
        SIZE_VARIANTS[size],
        loading ? 'pointer-events-none cursor-wait opacity-60' : '',
        disable ? 'pointer-events-none opacity-60' : '',
        className,
        disable ? disableClassName : ''
      )}
      {...rest}
    >
      {iconName && (
        <Icon
          iconName={iconName}
          size={ICON_SIZE_VARIANTS[size]}
          className={classnames(
            'mr-2 h-4 w-4',
            iconClassName,
            loading && 'invisible'
          )}
        />
      )}
      <span className={classnames(loading && 'invisible')}>{children}</span>
      {loading && (
        <Loader2
          size={ICON_SIZE_VARIANTS[size]}
          className="absolute animate-spin"
        />
      )}
    </button>
  )
}
