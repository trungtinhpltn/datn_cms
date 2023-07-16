import type { IconsName } from 'common/common.type'
import EmptyComponent from 'components/EmptyComponent'
import type { LucideProps } from 'lucide-react'
import * as icons from 'lucide-react'

export interface IIconProps extends LucideProps {
  iconName: IconsName
}

export default function Icon({ iconName, ...rest }: IIconProps) {
  const LucideIcon = iconName ? icons[iconName] : EmptyComponent
  return <LucideIcon {...rest} />
}
