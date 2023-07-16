import type { PropsWithCell } from 'common/tabulator-tables.type'
import { getMedia } from 'utils'

const ImageShow = ({ cell }: PropsWithCell) => {
  const value: string = cell?.getValue() || ''
  return (
    <div className="flex justify-center">
      <img src={getMedia(value)} className="max-w-[20]" />
    </div>
  )
}

export default ImageShow
