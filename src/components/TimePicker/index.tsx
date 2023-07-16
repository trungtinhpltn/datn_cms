export interface ITimePickerProps {}

export default function TimePicker(props: ITimePickerProps) {
  return (
    <div>
      <select>
        <option>1</option>
      </select>
    </div>
  )
}

// import Select from 'components/Select'
// import type { SelectData } from 'services/select.service'
// interface ITimePickerProps {
//   startLabel?: string
//   endLabel?: string
//   startPlaceholder: string
//   endPlaceholder: string
//   valueStart: SelectData | undefined
//   valueEnd: SelectData | undefined
//   setValueStart: React.Dispatch<React.SetStateAction<SelectData | undefined>>
//   setValueEnd: React.Dispatch<React.SetStateAction<SelectData | undefined>>
// }
// const optionTime = [
//   {
//     value: '01:30 AM',
//     label: '01:30 AM'
//   },
//   {
//     value: '02:00 AM',
//     label: '02:00 AM'
//   },
//   {
//     value: '02:30 AM',
//     label: '02:30 AM'
//   },
//   {
//     value: '03:00 AM',
//     label: '03:00 AM'
//   },
//   {
//     value: '03:30 AM',
//     label: '03:30 AM'
//   },
//   {
//     value: '04:00 AM',
//     label: '04:00 AM'
//   },
//   {
//     value: '04:30 AM',
//     label: '04:30 AM'
//   },
//   {
//     value: '05:00 AM',
//     label: '05:00 AM'
//   },
//   {
//     value: '05:30 AM',
//     label: '05:30 AM'
//   },
//   {
//     value: '06:00 AM',
//     label: '06:00 AM'
//   },
//   {
//     value: '06:30 AM',
//     label: '06:30 AM'
//   },
//   {
//     value: '07:00 AM',
//     label: '07:00 AM'
//   },
//   {
//     value: '07:30 AM',
//     label: '07:30 AM'
//   },
//   {
//     value: '08:00 AM',
//     label: '08:00 AM'
//   },
//   {
//     value: '08:30 AM',
//     label: '08:30 AM'
//   },
//   {
//     value: '09:00 AM',
//     label: '09:00 AM'
//   },
//   {
//     value: '09:30 AM',
//     label: '09:30 AM'
//   },
//   {
//     value: '10:00 AM',
//     label: '10:00 AM'
//   },
//   {
//     value: '10:30 AM',
//     label: '10:30 AM'
//   },
//   {
//     value: '11:00 AM',
//     label: '11:00 AM'
//   },
//   {
//     value: '11:30 AM',
//     label: '11:30 AM'
//   },
//   {
//     value: '12:00 AM',
//     label: '12:00 AM'
//   },
//   {
//     value: '01:30 PM',
//     label: '01:30 PM'
//   },
//   {
//     value: '02:00 PM',
//     label: '02:00 PM'
//   },
//   {
//     value: '02:30 PM',
//     label: '02:30 PM'
//   },
//   {
//     value: '03:00 PM',
//     label: '03:00 PM'
//   },
//   {
//     value: '03:30 PM',
//     label: '03:30 PM'
//   },
//   {
//     value: '04:00 PM',
//     label: '04:00 PM'
//   },
//   {
//     value: '04:30 PM',
//     label: '04:30 PM'
//   },
//   {
//     value: '05:00 PM',
//     label: '05:00 PM'
//   },
//   {
//     value: '05:30 PM',
//     label: '05:30 PM'
//   },
//   {
//     value: '06:00 PM',
//     label: '06:00 PM'
//   },
//   {
//     value: '06:30 PM',
//     label: '06:30 PM'
//   },
//   {
//     value: '07:00 PM',
//     label: '07:00 PM'
//   },
//   {
//     value: '07:30 PM',
//     label: '07:30 PM'
//   },
//   {
//     value: '08:00 PM',
//     label: '08:00 PM'
//   },
//   {
//     value: '08:30 PM',
//     label: '08:30 PM'
//   },
//   {
//     value: '09:00 PM',
//     label: '09:00 PM'
//   },
//   {
//     value: '09:30 PM',
//     label: '09:30 PM'
//   },
//   {
//     value: '10:00 PM',
//     label: '10:00 PM'
//   },
//   {
//     value: '10:30 PM',
//     label: '10:30 PM'
//   },
//   {
//     value: '11:00 PM',
//     label: '11:00 PM'
//   },
//   {
//     value: '11:30 PM',
//     label: '11:30 PM'
//   },
//   {
//     value: '12:00 PM',
//     label: '12:00 PM'
//   }
// ]

// const TimePicker = ({
//   startLabel,
//   endLabel,
//   valueStart,
//   valueEnd,
//   setValueStart,
//   setValueEnd,
//   startPlaceholder,
//   endPlaceholder,
//   ...rest
// }: ITimePickerProps) => {
//   return (
//     <div className="flex space-x-3">
//       <div className="flex items-center justify-center space-x-2">
//         <label htmlFor="startTime">{startLabel}</label>
//         <Select
//           onChange={(e: any) => {
//             setValueStart(e)
//           }}
//           value={valueStart}
//           placeholder={startPlaceholder}
//           options={optionTime}
//           isClearable
//         />
//       </div>
//       <div className="flex items-center justify-center space-x-2">
//         <label htmlFor="endTime">{endLabel}</label>
//         <Select
//           onChange={(e: any) => {
//             setValueEnd(e)
//           }}
//           value={valueEnd}
//           placeholder={endPlaceholder}
//           options={optionTime}
//           isClearable
//         />
//       </div>
//     </div>
//   )
// }
// export default TimePicker
