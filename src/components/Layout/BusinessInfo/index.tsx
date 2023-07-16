import LogoNav from 'assets/images/nav-logo.svg'

export default function BusinessInfo() {
  return (
    <>
      <div className="-intro-x mt-10 text-4xl font-medium leading-tight text-white">
        <img src={LogoNav} width={160} />
      </div>
      <div className="-intro-x mt-5 text-base text-white text-opacity-70 dark:text-slate-400">
        Điện thoại: 1900636019
        <br />
        Email: info@ftech.ai
      </div>
    </>
  )
}
