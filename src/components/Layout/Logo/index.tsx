import logo from 'src/assets/images/logo.svg'

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
  return (
    <a className="-intro-x hidden md:flex">
      <img alt="Midone - HTML Admin Template" className="w-6" src={logo} />
      <span className="ml-3 text-lg text-white"> MTFood </span>
    </a>
  )
}
