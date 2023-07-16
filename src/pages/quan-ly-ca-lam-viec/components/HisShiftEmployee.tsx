/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from 'components/Button'
import React from 'react'

import { SHIFT_TIME } from '../ca-nhan'

const HisShiftEmployee = ({ item }: { item: any }) => {
  return (
    <div className="flex gap-4 border-b last:border-none">
      <div className="grid flex-1 shrink-0 grid-cols-7">
        {SHIFT_TIME.map((day) => (
          <div className="border-r py-3 text-center" key={day?.key}>
            <div className={'grid grid-cols-1 gap-2 p-3'}>
              <Button
                color="primary"
                className="mr-2 w-[30px] sm:w-auto"
                size="md"
                disable
                disableClassName="!opacity-80"
                outline={!item?.[day.key]?.includes(1)}
              >
                Ca sáng
              </Button>
              <Button
                color="primary"
                className="mr-2 w-[30px] sm:w-auto"
                size="md"
                disable
                disableClassName="!opacity-80"
                outline={!item?.[day.key]?.includes(2)}
              >
                Ca chiều
              </Button>
              <Button
                color="primary"
                className="mr-2 w-[30px] sm:w-auto"
                size="md"
                disable
                disableClassName="!opacity-80"
                outline={!item?.[day.key]?.includes(3)}
              >
                Ca tối
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HisShiftEmployee
