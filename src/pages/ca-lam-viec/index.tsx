/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import Button from 'components/Button'
import Select from 'components/Select'
import { Month } from 'contants'
import { useAuth } from 'contexts/auth'
import { useGlobalContext } from 'contexts/global'
import { usePopup } from 'contexts/popup'
import type { IHisShift } from 'models/shift'
import { SHIFT_TIME } from 'pages/quan-ly-ca-lam-viec/ca-nhan'
import HisShiftEmployee from 'pages/quan-ly-ca-lam-viec/components/HisShiftEmployee'
import { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import {
  createShiftByUserId,
  getHisShiftByEmployee,
  getShiftByUserId
} from 'services/shift.service'
import { formatDate } from 'utils'
import { toastError, toastSuccess } from 'utils/toast'

const UserShift = () => {
  const { user } = useAuth()
  const { restaurantSelect } = useGlobalContext()
  const { showPopupConfirm } = usePopup()
  const [shitfPick, setShitfPick] = useState<{
    [key: string]: number[]
  } | null>(null)
  const [userShift, setUserShift] = useState<{
    [key: string]: number[]
  } | null>(null)
  const [edit, setEdit] = useState(false)
  const [msg, setMsg] = useState('')
  const [listHisShift, setListHisShift] = useState<IHisShift[]>([])
  const [monthSelect, setMonthSelect] = useState(new Date().getMonth() + 1)
  const [daySelect, setDaySelect] = useState<any>('')
  const [dayFilter, setDayFilter] = useState<any[]>([])

  const getData = useCallback(() => {
    if (!user?.Employee?.id) return
    if (user?.Employee?.id <= 0) return
    getShiftByUserId(user?.Employee?.id || -1).then((res) => {
      if (res) {
        // setShitfPick(res)
        setUserShift(res)
        setMsg('Thay đổi thành công.')
      }
    })
  }, [user?.Employee?.id])

  const createShiftMutation = useMutation({
    mutationFn: (data: any) => createShiftByUserId(data),
    onSuccess: () => {
      toastSuccess(msg ? msg : 'Đăng ký ca làm việc thành công.')
      getData()
    },
    onError: (err: any) => {
      toastError(err?.message || 'Đã có lỗi xảy ra')
    }
  })

  useEffect(() => {
    getData()
  }, [getData])

  const getDataHisShift = useCallback(async () => {
    if (!restaurantSelect?.id) return
    if (!user?.Employee?.id) return
    if (!daySelect) return
    try {
      const currentYear = new Date().getFullYear()
      const dateS = daySelect.value.split('-')
      getHisShiftByEmployee({
        year: currentYear,
        start: dateS?.[0],
        end: dateS?.[1],
        restaurant_id: restaurantSelect?.id,
        employee_id: user?.Employee?.id
      }).then((res) => {
        setListHisShift(res)
      })
    } catch (error: any) {
      toastError(error.message)
    }
  }, [restaurantSelect?.id, daySelect, user?.Employee?.id])

  useEffect(() => {
    getDataHisShift()
  }, [getDataHisShift])

  const optionsByWeekFunc = useCallback(() => {
    const options: any[] = []
    const date = new Date(2023, monthSelect, 0)
    const num = date.getDate() - date.getDay()
    let i = 0
    let loop = true
    do {
      const lastNum = num + 7 - 7 * i
      const firstNum = lastNum - 6
      const firstDay = new Date(
        new Date(2023, monthSelect, 0).setDate(firstNum)
      )
      const lastDay = new Date(new Date(2023, monthSelect, 0).setDate(lastNum))
      const option =
        `00${firstDay.getDate()}`.slice(-2) +
        `/` +
        `00${firstDay.getMonth() + 1}`.slice(-2) +
        ` - ` +
        `00${lastDay.getDate()}`.slice(-2) +
        `/` +
        `00${lastDay.getMonth() + 1}`.slice(-2)

      firstDay.getMonth() + 1 <= monthSelect &&
        firstDay.getFullYear() <= date.getFullYear() &&
        options.push({
          label: option,
          value: `${firstDay?.toDateString()}-${lastDay?.toDateString()}`
        })
      firstDay.getMonth() + 1 === 12 &&
        monthSelect === 1 &&
        options.push({
          label: option,
          value: `${firstDay?.toDateString()}-${lastDay?.toDateString()}`
        })
      i++
      if (
        new Date(new Date().toDateString()).getTime() <= lastDay.getTime() &&
        new Date(new Date().toDateString()).getTime() >= firstDay.getTime()
      ) {
        setDaySelect({
          label: option,
          value: `${firstDay?.toDateString()}-${lastDay?.toDateString()}`
        })
      }
      const month = firstDay.getMonth() > 0 ? firstDay.getMonth() + 1 : 12

      if (month < monthSelect) {
        loop = false
      }
      if (
        month === 12 &&
        firstDay.getFullYear() === 2023 &&
        monthSelect === 2
      ) {
        loop = false
      }
      if (firstDay.getFullYear() < 2023 && monthSelect === 1) {
        loop = false
      }
    } while (loop && i <= 7)
    if (monthSelect !== new Date().getMonth() + 1) {
      setDaySelect(options?.[0])
    }
    setDayFilter(options)
  }, [monthSelect])

  useEffect(() => {
    optionsByWeekFunc()
  }, [optionsByWeekFunc])

  const handlePick = (pick: { key: string; value: number }) => {
    let newpick = shitfPick?.[pick.key] || []
    if (newpick?.indexOf(pick.value) === -1) {
      newpick.push(pick.value)
    } else {
      newpick = newpick.filter((value) => value !== pick.value)
    }
    setShitfPick((pre) => ({ ...pre, [pick.key]: newpick }))
  }

  useEffect(() => {
    if (!userShift) return
    setShitfPick(JSON.parse(JSON.stringify(userShift)))
  }, [userShift])

  const handleApplyPick = () => {
    if (!shitfPick) {
      return
    }

    if (!user?.Employee?.id) return
    createShiftMutation.mutate({
      employeeId: user?.Employee?.id,
      ...shitfPick
    })
  }

  const handleChangePick = () => {
    if (!shitfPick) {
      return
    }
    if (!user?.Employee?.id) return
    createShiftMutation.mutate({
      employeeId: user?.Employee?.id,
      ...shitfPick
    })
  }

  return (
    <div className="mt-5">
      <div className="mb-6">
        <h2 className="mr-auto text-2xl font-bold">Quản lý ca làm việc</h2>
        <div className="mt-4">
          <p>
            Sáng: <span className="font-medium">Từ 8h:00 - 13h:00</span>
          </p>
          <p>
            Chiều: <span className="font-medium">Từ 13h:00 - 18h:00</span>
          </p>
          <p>
            Tối: <span className="font-medium">Từ 18h:00 - 22h:00</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-7 border border-b-0">
        {SHIFT_TIME.map((item) => (
          <div
            className="border-r py-3 text-center last:border-none"
            key={item?.key}
          >
            <span className="text-lg font-medium">{item?.name}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 border">
        {SHIFT_TIME.map((item) => (
          <div
            key={item?.key}
            className={'last-border-none grid grid-cols-1 gap-2 border-r p-3'}
          >
            <Button
              color="primary"
              className="mr-2 w-[30px] sm:w-auto"
              iconName="Clock1"
              size="md"
              outline={!shitfPick?.[item?.key]?.includes(1)}
              onClick={() => {
                handlePick({ key: item?.key, value: 1 })
              }}
              disable={!edit && !!userShift}
              disableClassName="!opacity-80"
            >
              Ca sáng
            </Button>
            <Button
              color="primary"
              className="mr-2 w-[30px] sm:w-auto"
              iconName="Clock1"
              size="md"
              outline={!shitfPick?.[item?.key]?.includes(2)}
              onClick={() => {
                handlePick({ key: item?.key, value: 2 })
              }}
              disable={!edit && !!userShift}
              disableClassName="!opacity-80"
            >
              Ca chiều
            </Button>
            <Button
              color="primary"
              className="mr-2 w-[30px] sm:w-auto"
              iconName="Clock1"
              size="md"
              outline={!shitfPick?.[item?.key]?.includes(3)}
              onClick={() => {
                handlePick({ key: item?.key, value: 3 })
              }}
              disable={!edit && !!userShift}
              disableClassName="!opacity-80"
            >
              Ca tối
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {userShift ? (
          edit ? (
            <div className="flex justify-center gap-6">
              <Button
                color="danger"
                className="mr-2 !w-[130px] sm:w-auto"
                size="md"
                outline
                onClick={() => {
                  setEdit(false)
                  getData()
                }}
              >
                Hủy
              </Button>
              <Button
                color="primary"
                className="mr-2 w-[30px] sm:w-auto"
                size="md"
                onClick={() => {
                  showPopupConfirm({
                    title:
                      'Bạn có thật sự muốn thay đổi lịch đăng ký ca làm việc?',
                    message: 'Việc thay đổi sẽ được áp dụng vào tuần sau.',
                    classNameIcon: 'text-red-600',
                    titleConfirm: 'Xóa',
                    comfirmCallback: async ({ setShow }) => {
                      handleChangePick()
                      setEdit(false)
                      setShow(false)
                    }
                  })
                }}
              >
                Lưu thay đổi
              </Button>
            </div>
          ) : (
            <Button
              color="primary"
              className="mr-2 w-[30px] sm:w-auto"
              size="md"
              onClick={() => {
                setEdit(true)
              }}
            >
              Thay đổi ca làm việc
            </Button>
          )
        ) : (
          <Button
            color="primary"
            className="mr-2 w-[30px] sm:w-auto"
            size="md"
            onClick={handleApplyPick}
          >
            Đăng ký ca làm việc
          </Button>
        )}
      </div>

      <div className="mt-6">
        <div className="mb-6">
          <h2 className="mr-auto text-2xl font-bold">Lịch sử ca làm việc</h2>
        </div>
        <div className="grid grid-cols-1 border">
          <div className="border-b">
            <div className="grid max-w-[1000px] grid-cols-3 gap-4">
              <div className="flex items-center border-r p-3 text-lg font-medium">
                <div className="flex w-full items-center gap-4">
                  <span>Ngày: </span>
                  <Select
                    handleFunc={(e) => {
                      setDaySelect(e)
                    }}
                    value={daySelect}
                    options={dayFilter}
                    placeholder={'Ngày'}
                    className="react-select-container z-[70] max-h-[400px] w-full"
                  />
                </div>
              </div>
              <div className="flex items-center border-r p-3 text-lg font-medium">
                <div className="flex w-full items-center gap-4">
                  <span>Tháng: </span>
                  <Select
                    handleFunc={(e) => {
                      setMonthSelect(+e.value)
                    }}
                    value={
                      Month?.find((item) => item.value === monthSelect) ||
                      Month?.[0]
                    }
                    options={Month}
                    placeholder={'Tuần'}
                    className="react-select-container z-[70] max-h-[400px] w-full"
                  />
                </div>
              </div>
              <div className="flex items-center border-r p-3 text-lg font-medium">
                <div className="flex w-full items-center gap-4">
                  <span>Năm: </span>
                  <Select
                    handleFunc={() => {}}
                    value={{
                      label: '2023',
                      value: '2023'
                    }}
                    options={[
                      {
                        label: '2023',
                        value: '2023'
                      }
                    ]}
                    placeholder={'Tuần'}
                    className="react-select-container z-[70] max-h-[400px] w-full"
                  />
                </div>
              </div>
            </div>
            {listHisShift?.[0]?.msg && (
              <div className="grid grid-cols-1 gap-2 p-3 text-base font-medium">
                <p>{listHisShift?.[0]?.msg}</p>
                <p>
                  Thời gian: {formatDate(listHisShift?.[0]?.updatedAt + '')}
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-4 border-b">
            <div className="grid flex-1 shrink-0 grid-cols-7">
              {SHIFT_TIME.map((day) => (
                <div
                  className="border-r py-3 text-center last:border-none"
                  key={day?.key}
                >
                  <span className="text-lg font-medium">{day?.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1">
            {listHisShift?.length > 0 ? (
              listHisShift?.map((item) => (
                <HisShiftEmployee key={`ls-em-${item?.id}`} item={item} />
              ))
            ) : (
              <p className="p-3 text-center text-lg font-medium">
                Không có dữ liệu{' '}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserShift
