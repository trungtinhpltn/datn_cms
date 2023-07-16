import type { PropsWithCell } from 'common/tabulator-tables.type'
import Icon from 'components/Icon'

const ShowStatus = ({ cell }: PropsWithCell) => {
  const value = cell?.getValue() || ''

  return (
    <>
      {value === true ? (
        <div className="flex items-center justify-start text-green-500">
          <Icon iconName="Check" className="mr-1.5" size={17} />
          Đã xác nhận
        </div>
      ) : (
        <div className="flex items-center justify-start text-danger">
          <Icon iconName="X" className="mr-1.5" size={17} />
          Chưa xác nhận
        </div>
      )}
    </>
  )
}

export default ShowStatus
