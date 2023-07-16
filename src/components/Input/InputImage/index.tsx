import Icon from 'components/Icon'
import * as React from 'react'

export interface IInputImageProps {
  defaultImage?: string
  onChange: (file?: File) => void
}

export default function InputImage(props: IInputImageProps) {
  const { defaultImage, onChange, ...rest } = props
  const [filePath, setFilePath] = React.useState(defaultImage)
  return (
    <div className="group relative m-4 h-36 w-36 overflow-hidden rounded-full bg-slate-300">
      <img
        src={filePath}
        className="absolute inset-0 z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-black/30 group-hover:z-20">
        <Icon iconName="Camera" className="h-6 w-6" />
      </div>
      <input
        {...rest}
        type="file"
        accept="image/*"
        className="absolute inset-0 z-30 h-full w-full opacity-0"
        onChange={(e) => {
          const file = e?.target?.files?.[0]
          if (!file) {
            return
          }
          setFilePath(URL.createObjectURL(file))
          onChange?.(file)
        }}
      />
    </div>
  )
}
