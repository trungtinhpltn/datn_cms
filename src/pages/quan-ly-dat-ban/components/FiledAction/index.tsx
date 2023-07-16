import type { PropsWithCell } from 'common/tabulator-tables.type'
import Button from 'components/Button'

const FieldAction = ({
  cell,
  navigateLink
}: PropsWithCell<{
  navigateLink: (id: number | string) => void
}>) => {
  const value: string = cell?.getValue() || ''

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        color="primary"
        className="mr-2 w-[30px] sm:w-auto"
        iconName="Eye"
        size="sm"
        outline
        onClick={() => {
          navigateLink(value)
        }}
      >
        Chi tiết
      </Button>
    </div>
  )
}

export default FieldAction
