import type { SelectOption } from 'components/Select'
import Select from 'components/Select'
import { useGlobalContext } from 'contexts/global'
import { useMemo } from 'react'

export type ServiceOption = SelectOption

export default function ChoiceService() {
  const { services, activeService, setActiveService } = useGlobalContext()

  const options = useMemo<ServiceOption[]>(
    () =>
      services?.map((s) => ({
        value: Number(s.id),
        label: String(s.name)
      })) || [],
    [services]
  )

  const selectedOption = useMemo(
    () =>
      activeService
        ? {
            label: String(activeService?.name),
            value: Number(activeService?.code)
          }
        : undefined,
    [activeService]
  )

  return (
    <>
      {options && options.length ? (
        <Select<ServiceOption>
          className="user-status-select mr-4 min-w-[160px] cursor-pointer border-none"
          placeholder="Chọn dịch vụ"
          options={options}
          value={selectedOption}
          handleFunc={(choice) => {
            const tmp = services?.find((s) => s.id === choice.value)
            tmp && setActiveService(tmp)
          }}
        />
      ) : null}
    </>
  )
}
