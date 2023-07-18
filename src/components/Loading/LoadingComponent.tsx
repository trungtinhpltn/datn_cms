type LoadingProps = { show: boolean }

export default function LoadingComponent({ show }: LoadingProps) {
  return (
    <div
      className={`inset-0 z-[1000] flex h-full w-full items-center justify-center bg-cover transition-opacity ${
        show
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="border-colorcs-FA5E00 h-12 w-12 animate-spin rounded-[50%] border-4 border-t-transparent" />
    </div>
  )
}
