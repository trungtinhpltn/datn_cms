import type { PropsWithCell } from 'common/tabulator-tables.type'

const ImageShow = ({ cell }: PropsWithCell) => {
  const value: string = cell?.getValue() || ''
  return (
    <div className="flex justify-center">
      <img src={value} className="max-w-[20]" />
    </div>
  )
}

export default ImageShow
