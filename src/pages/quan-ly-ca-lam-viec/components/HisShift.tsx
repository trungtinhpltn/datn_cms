/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from 'components/Button'
import type { IHisShift } from 'models/shift'
import React, { useEffect, useMemo, useState } from 'react'
import { createHisShift, updateHisShift } from 'services/shift.service'
import { toastError, toastSuccess } from 'utils/toast'

import { SHIFT_TIME } from '../ca-nhan'

const HisShift = ({
  item,
  callback
}: {
  item: IHisShift
  callback: () => void
}) => {
  const [edit, setEdit] = useState(false)
  const [itemShow, setItemShow] = useState<any>()

  useEffect(() => {
    setItemShow(JSON.parse(JSON.stringify(item)))
  }, [item])

  const showEdit = useMemo(() => {
    const current = new Date(new Date().toDateString()).getTime()
    const start = new Date(item.startDate).getTime()

    const end = new Date(item.endDate).getTime()
    if (current >= start && current <= end) {
      return true
    }
    if (current <= start && item.exits) return true
    return false
  }, [item])

  const handlePick = (pick: { key: string; value: number }) => {
    let newpick = itemShow?.[pick.key] || []
    if (newpick?.indexOf(pick.value) === -1) {
      newpick.push(pick.value)
    } else {
      newpick = newpick.filter((value: number) => value !== pick.value)
    }
    setItemShow({ ...itemShow, [pick.key]: newpick })
  }

  const handleSave = async () => {
    try {
      if (!item?.exits) {
        await createHisShift({
          employeeId: item?.employeeId,
          restaurantId: item?.restaurantId,
          startDate: item?.startDate,
          endDate: item?.endDate,
          year: item?.year,
          monday: itemShow?.monday || [],
          tuesday: itemShow?.tuesday || [],
          wednesday: itemShow?.wednesday || [],
          thursday: itemShow?.thursday || [],
          friday: itemShow?.friday || [],
          saturday: itemShow?.saturday || [],
          sunday: itemShow?.sunday || [],
          updatedAt: new Date().toISOString(),
          msg: 'Lịch làm việc đã được cập nhật bởi quản lý.'
        })
      } else {
        await updateHisShift(itemShow?.id, {
          monday: itemShow?.monday || [],
          tuesday: itemShow?.tuesday || [],
          wednesday: itemShow?.wednesday || [],
          thursday: itemShow?.thursday || [],
          friday: itemShow?.friday || [],
          saturday: itemShow?.saturday || [],
          sunday: itemShow?.sunday || [],
          updatedAt: new Date().toISOString(),
          msg: 'Lịch làm việc đã được cập nhật bởi quản lý.'
        })
      }

      callback && callback()
      toastSuccess('Thay đổi thành công.')
    } catch (error: any) {
      toastError(error?.message || 'Đã có lỗi xảy ra')
    } finally {
      setEdit(false)
    }
  }

  return (
    <div className="flex gap-4 border-b last:border-none">
      <div className="flex w-[150px] items-center border-r p-3 text-lg font-medium">
        {itemShow?.Employee?.name}
      </div>
      <div className="grid flex-1 shrink-0 grid-cols-8">
        {SHIFT_TIME.map((day) => (
          <div className="border-r py-3 text-center" key={day?.key}>
            <div className={'grid grid-cols-1 gap-2 p-3'}>
              <Button
                color="primary"
                className="mr-2 w-[30px] sm:w-auto"
                size="md"
                disable={!edit}
                disableClassName="!opacity-80"
                outline={!itemShow?.[day.key]?.includes(1)}
                onClick={() => {
                  handlePick({ key: day?.key, value: 1 })
                }}
              >
                Ca sáng
              </Button>
              <Button
                color="primary"
                className="mr-2 w-[30px] sm:w-auto"
                size="md"
                disable={!edit}
                disableClassName="!opacity-80"
                outline={!itemShow?.[day.key]?.includes(2)}
                onClick={() => {
                  handlePick({ key: day?.key, value: 2 })
                }}
              >
                Ca chiều
              </Button>
              <Button
                color="primary"
                className="mr-2 w-[30px] sm:w-auto"
                size="md"
                disable={!edit}
                disableClassName="!opacity-80"
                outline={!itemShow?.[day.key]?.includes(3)}
                onClick={() => {
                  handlePick({ key: day?.key, value: 3 })
                }}
              >
                Ca tối
              </Button>
            </div>
          </div>
        ))}
        {showEdit && (
          <div className="flex items-center justify-center py-3">
            {edit ? (
              <div className="grid grid-cols-1 gap-4">
                <Button
                  color="success"
                  className="mr-2 w-[30px] sm:w-auto"
                  iconName="Save"
                  size="sm"
                  outline
                  onClick={() => {
                    handleSave()
                  }}
                >
                  Lưu
                </Button>
                <Button
                  color="danger"
                  className="mr-2 w-[30px] sm:w-auto"
                  iconName="X"
                  size="sm"
                  outline
                  onClick={() => {
                    setEdit(false)
                    setItemShow(JSON.parse(JSON.stringify(item)))
                  }}
                >
                  Hủy
                </Button>
              </div>
            ) : (
              <Button
                color="warning"
                className="mr-2 w-[30px] sm:w-auto"
                iconName="Edit"
                size="sm"
                outline
                onClick={() => {
                  setEdit(true)
                }}
              >
                Sửa
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HisShift
