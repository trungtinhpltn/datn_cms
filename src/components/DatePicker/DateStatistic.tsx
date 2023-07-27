import type { IInputProps } from 'components/Input'
import dayjs from 'dayjs'
import Litepicker from 'litepicker'
import type { DateTime } from 'litepicker/dist/types/datetime'
import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { toastError } from 'utils/toast'

import TimePickerInput from './TimePicker'

export interface IDatePickerProps extends IInputProps {
  singleMode?: boolean
  withTimePicker?: boolean
  title?: string
  onApplyRange: ({ from, to }: { from: number; to: number }) => void
  customOptions?: any
  hideQuickPick?: boolean
  required?: boolean
}

export default function DateStatistic({
  singleMode,
  withTimePicker,
  title,
  onApplyRange,
  customOptions,
  hideQuickPick,
  required,
  defaultValue,
  ...reset
}: IDatePickerProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const $ = (window as any).$
    const options = {
      resetButton: true,
      autoApply: false,
      singleMode: false,
      numberOfColumns: 2,
      numberOfMonths: 2,
      showWeekNumbers: true,
      format: {
        parse(date: string | number | Date) {
          const res = dayjs(date, {
            locale: 'vi-VN',
            format: 'DD/MM/YYYY',
            utc: false
          }).toDate()
          return res
        },
        output(date: Date) {
          if (withTimePicker) {
            return dayjs(date).format('DD/MM/YYYY HH:mm')
          }
          return dayjs(date).format('DD/MM/YYYY')
        }
      },
      lang: 'vi-VN',
      dropdowns: {
        minYear: 1990,
        maxYear: null,
        months: true,
        years: true
      },
      setup: (picker: Litepicker) => {
        function renderQuickPickDate() {
          const container = document.createElement('div')
          const QuickPickDate = () => {
            const pickerItems = [
              {
                label: 'Hôm nay',
                onclick: () => {
                  const date1 = dayjs().startOf('date').unix() * 1000
                  const date2 = dayjs().endOf('date').unix() * 1000
                  picker.setDateRange(date1, date2)
                  onApplyRange({
                    from: date1 || 0,
                    to: date2 || 0
                  })
                }
              },
              {
                label: 'Hôm qua',
                onclick: () => {
                  const yesterday = dayjs().subtract(1, 'day')
                  const date1 = yesterday.startOf('date').unix() * 1000
                  const date2 = yesterday.endOf('date').unix() * 1000
                  picker.setDateRange(date1, date2)
                  onApplyRange({
                    from: date1 || 0,
                    to: date2 || 0
                  })
                }
              },
              {
                label: '7 ngày trước',
                onclick: () => {
                  const date1 = dayjs().subtract(7, 'days').unix() * 1000
                  const date2 = dayjs().unix() * 1000
                  picker.setDateRange(date1, date2)
                  onApplyRange({
                    from: date1 || 0,
                    to: date2 || 0
                  })
                }
              },
              {
                label: '30 ngày trước',
                onclick: () => {
                  const date1 = dayjs().subtract(30, 'days').unix() * 1000
                  const date2 = dayjs().unix() * 1000
                  picker.setDateRange(date1, date2)
                  onApplyRange({
                    from: date1 || 0,
                    to: date2 || 0
                  })
                }
              },
              {
                label: 'Năm trước',
                onclick: () => {
                  const date1 = dayjs().subtract(1, 'year').unix() * 1000
                  const date2 = dayjs().unix() * 1000
                  picker.setDateRange(date1, date2)
                  onApplyRange({
                    from: date1 || 0,
                    to: date2 || 0
                  })
                }
              }
            ]
            return (
              <ul className="w-32 p-2">
                {pickerItems.map((item) => (
                  <li
                    key={item.label}
                    className="cursor-pointer rounded px-2 py-1 hover:bg-slate-100"
                    onClick={() => {
                      item.onclick()
                      picker.hide()
                    }}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )
          }
          createRoot(container).render(<QuickPickDate />)
          return container
        }

        function renderTimePicker(key: number) {
          const container = document.createElement('div')
          const getDefaultValue = () => {
            if (key === 0) {
              const value = picker.getDate()
              if (value) {
                return dayjs(value.toJSDate()).format('HH:mm')
              }
            }
            if (key === 1) {
              const value = picker.getEndDate()
              if (value) {
                return dayjs(value.toJSDate()).format('HH:mm')
              }
            }
            return '00:00'
          }
          const TimePicker = () => {
            return (
              <TimePickerInput
                className={'timepicker' + key}
                config="hh:mm"
                format="24"
                defaultValue={getDefaultValue()}
              />
            )
          }
          createRoot(container).render(<TimePicker />)
          return container
        }

        picker.on('render', (ui: HTMLDivElement) => {
          const btnCancel = ui.querySelector('.button-cancel')
          const btnApply = ui.querySelector('.button-apply')
          if (btnCancel && btnApply) {
            btnCancel.innerHTML = 'Hủy bỏ'
            btnApply.innerHTML = 'Xác nhận'
          }

          if (!hideQuickPick) {
            ui.style.transform = 'translateX(-128px)'
            ui.querySelector('.container__main')?.prepend(renderQuickPickDate())
          }
          if (withTimePicker) {
            ui.querySelectorAll('.month-item-header').forEach((item, key) => {
              item?.parentNode?.appendChild(renderTimePicker(key))
            })
          }
        })

        picker.on('button:apply', (date1: DateTime, date2: DateTime) => {
          if (required && (!date1 || !date2)) {
            return toastError('Vui lòng chọn khoảng thời gian')
          }

          if (!date1 || !date2) {
            return onApplyRange({
              from: 0,
              to: 0
            })
          }

          let newDate1 = date1.getTime()
          let newDate2 = date2.getTime()

          if (withTimePicker) {
            const timepicker1 =
              document.querySelector<HTMLSelectElement>('.timepicker0')
            const timepicker2 =
              document.querySelector<HTMLSelectElement>('.timepicker1')
            const hour1 = Number(timepicker1?.dataset?.value?.split(':')[0])
            const minute1 = Number(timepicker1?.dataset?.value?.split(':')[1])
            const hour2 = Number(timepicker2?.dataset?.value?.split(':')[0])
            const minute2 = Number(timepicker2?.dataset?.value?.split(':')[1])

            newDate1 = dayjs(date1.toJSDate())
              .hour(hour1)
              .minute(minute1)
              .toDate()
              .getTime()
            newDate2 = dayjs(date2.toJSDate())
              .hour(hour2)
              .minute(minute2)
              .toDate()
              .getTime()
          }

          picker.setDateRange(newDate1, newDate2)

          return onApplyRange({
            from: newDate1,
            to: newDate2
          })
        })
      }
    }

    if (singleMode) {
      options.singleMode = true
      options.numberOfColumns = 1
      options.numberOfMonths = 1
    }

    if ($(ref.current).data('format')) {
      options.format = $(ref.current).data('format')
    }

    if (!$(ref.current).val()) {
      // let date = dayjs().format(options.format)
      // date += !options.singleMode
      //   ? ' - ' + dayjs().add(1, 'month').format(options.format)
      //   : ''
      // $(ref.current).val(date)
    }

    const picker = new Litepicker({
      element: ref.current,
      ...options,
      ...(customOptions || {})
    })
    return () => picker.destroy()
  }, [])

  useEffect(() => {
    if (ref.current && defaultValue) {
      ref.current.value = String(defaultValue)
    }
  }, [defaultValue])

  return (
    <div className="flex items-center space-x-2">
      <p className="font-medium">{title}</p>
      <input
        ref={ref}
        type="text"
        className="datepicker form-control block w-56"
        onKeyDown={(e) => e.preventDefault()}
        onKeyUp={(e) => e.preventDefault()}
        {...reset}
      />
    </div>
  )
}
