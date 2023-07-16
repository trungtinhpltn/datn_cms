import Chance from 'chance'
import classNames from 'classnames'
import { useAuth } from 'contexts/auth'
import { useMemo } from 'react'
type Size = 'small' | 'medium' | 'large'

type AvatarProps = {
  size?: Size
  src?: string
  alt?: string
  name?: string
}

const sizes: Record<Size, string> = {
  small: 'w-10 h-10',
  medium: 'w-12 h-12',
  large: 'w-14 h-14'
}

export const EmptyAvatar = ({ name }: Pick<AvatarProps, 'name'>) => {
  const { user } = useAuth()
  const firstInitial = name
    ? name?.trim().charAt(0)
    : user?.name?.trim().charAt(0) || 'U'

  const randomColor = useMemo(() => {
    const chance = new Chance(name || '')
    return chance.color({ format: 'hex' })
  }, [name])
  return (
    <div
      style={{ backgroundColor: randomColor }}
      className={classNames(
        'flex h-full w-full items-center justify-center rounded-full font-medium uppercase'
      )}
    >
      {firstInitial}
    </div>
  )
}

export default function Avatar({ size = 'medium', src, alt }: AvatarProps) {
  if (!src) {
    return <EmptyAvatar />
  }

  return (
    <img
      className={classNames('inline-block rounded-full', sizes[size])}
      src={src}
      alt={alt}
    />
  )
}
