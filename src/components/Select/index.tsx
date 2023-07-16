import type { IconsName } from 'common/common.type'
import Icon from 'components/Icon'
import type { ControlProps } from 'react-select'
import { default as RSelect } from 'react-select'
import { components } from 'react-select'
import type { StateManagerProps } from 'react-select/dist/declarations/src/stateManager'

interface SelectProps<T> {
  handleFunc?: (choice: T) => void
  value?: any
}
export interface SelectOption {
  value: string | number
  label: string
  icon?: IconsName
}

export default function Select<T extends SelectOption>(
  props: StateManagerProps & SelectProps<T>
) {
  const { value, handleFunc } = props
  const icon = value?.icon
  const renderIcon = (icon: IconsName) => {
    return <Icon iconName={icon} className="mx-2 h-4 w-4" />
  }

  const Control = ({ children, ...props }: ControlProps) => {
    return (
      <components.Control {...props}>
        {icon && renderIcon(icon)}
        {children}
      </components.Control>
    )
  }

  return (
    <RSelect
      styles={{
        control: (baseStyles, state) => {
          return {
            ...baseStyles,
            borderColor: '#d0d0d0',
            boxShadow: '0px 3px 20px #0000000b'
          }
        }
      }}
      className="react-select-container z-50"
      classNamePrefix="select-input__custom react-select"
      {...props}
      components={{ Control }}
      onChange={(choice) => handleFunc && handleFunc(choice as T)}
    />
  )
}
