import type { PropsWithCell } from 'common/tabulator-tables.type'
import Button from 'components/Button'
import { ListViewCtx } from 'components/ListView'
import { _t } from 'contexts/i18n'
import type { IShowPopupConfirmParams } from 'contexts/popup'
import { deleteRowAndReloadTable } from 'utils/tabulator-tables'

const FieldAction = ({
  cell,
  showPopupConfirm,
  navigateLink,
  deleteFn
}: PropsWithCell<{
  showPopupConfirm: (param: IShowPopupConfirmParams) => void
  navigateLink: (id: number | string) => void
  deleteFn: (id: number) => void
}>) => {
  // const [status, setStatus] = useState(cell?.getRow().getData()?.active)
  const value: string = cell?.getValue() || ''

  // const handleChangeActive = async () => {
  //   try {
  //     await editRestaurant({
  //       id: cell?.getRow().getData()?.id,
  //       data: {
  //         active: !status
  //       }
  //     })
  //     setStatus((oldValue: any) => !oldValue)
  //     resetTable()
  //   } catch (error: any) {
  //     toastError(error?.message)
  //   }
  // }

  // const resetTable = useCallback(() => {
  //   const table = ListViewCtx?.getTable?.()
  //   reloadTable(table)
  // }, [])

  return (
    <div className="flex items-center justify-center gap-2">
      {/* <InputToggle
        className="mr-2"
        checked={status}
        onChange={() => {
          setStatus((oldValue: boolean) => !oldValue)
          handleChangeActive()
        }}
      /> */}
      <Button
        color="warning"
        className="mr-2 w-[30px] sm:w-auto"
        iconName="Edit"
        size="sm"
        outline
        onClick={(e) => {
          e.stopPropagation()
          navigateLink(value)
        }}
      >
        {_t('action.button.edit')}
      </Button>
      <Button
        color="danger"
        className="mr-2 w-[30px] sm:w-auto"
        iconName="Trash"
        size="sm"
        outline
        onClick={(e) => {
          e.stopPropagation()
          showPopupConfirm({
            title: 'Bạn có thật sự muốn xóa nhà hàng này?',
            iconName: 'XCircle',
            classNameIcon: 'text-red-600',
            titleConfirm: 'Xóa',
            comfirmCallback: async ({ setShow }) => {
              const index = cell?.getRow()?.getIndex()
              const table = ListViewCtx.getTable?.()
              try {
                if (table) {
                  deleteFn(+value)
                  deleteRowAndReloadTable(table, index)
                }
              } catch (err) {
                console.error(err)
              } finally {
                setShow(false)
              }
            }
          })
        }}
      >
        {_t('action.button.delete')}
      </Button>
    </div>
  )
}

export default FieldAction
