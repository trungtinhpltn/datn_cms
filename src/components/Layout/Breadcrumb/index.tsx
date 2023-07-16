import { useEffect } from 'react'
import { useMatches } from 'react-router-dom'

export interface IBreadcrumbProps {}

export default function Breadcrumb(props: IBreadcrumbProps) {
  const matches = useMatches()

  const crumbs = matches
    .filter((match) => Boolean((match?.handle as any)?.crumb))
    .map((match) => (match?.handle as any).crumb(match))
  useEffect(() => {
    const title =
      crumbs.pop()?.props.children || crumbs[crumbs.length - 1]?.props.children
    document.title = `CMS - ${title}`
  }, [crumbs])
  return (
    <nav aria-label="breadcrumb" className="-intro-x mr-auto h-full">
      <ol className="breadcrumb breadcrumb-light">
        {crumbs.map((crumb, index) => (
          <div className="breadcrumb-item" key={index}>
            <div>{crumb}</div>
          </div>
        ))}
      </ol>
    </nav>
  )
}
