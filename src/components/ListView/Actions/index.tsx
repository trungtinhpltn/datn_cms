import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import { ChevronDown, FileText } from 'lucide-react'

export interface IListViewActionsProps {}

export default function ListViewActions(props: IListViewActionsProps) {
  return (
    <div className="mt-5 flex sm:mt-0">
      <Button
        color="secondary"
        className="mr-2 w-1/2 sm:w-auto"
        iconName="Printer"
        outline
        onClick={() => {
          console.log({ action: 'Printer' })
        }}
      >
        Print
      </Button>
      <Dropdown
        className="w-1/2 sm:w-auto"
        btnClassName="dropdown-toggle btn btn-outline-secondary w-full sm:w-auto"
        title={
          <>
            <FileText data-lucide="file-text" className="mr-2 h-4 w-4" /> Export
            <ChevronDown
              data-lucide="chevron-down"
              className="ml-auto h-4 w-4 sm:ml-2"
            />
          </>
        }
        items={[
          { title: 'Export CSV', iconName: 'FileText', id: 1 },
          { title: 'Export JSON', iconName: 'FileText', id: 2 },
          { title: 'Export XLSX', iconName: 'FileText', id: 3 }
        ]}
      />
    </div>
  )
}
