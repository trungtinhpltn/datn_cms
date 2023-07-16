import Input from 'components/Input'
import { Search } from 'lucide-react'
import { useState } from 'react'

export interface ISeachBarProps {}

export default function SeachBar(props: ISeachBarProps) {
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="intro-x relative mr-3 sm:mr-6">
      <div className="search hidden sm:block">
        <Input
          type="text"
          className="search__input form-control border-transparent"
          placeholder="Search..."
          onFocus={() => setShowResult(true)}
          onBlur={() => setShowResult(false)}
        />
        <Search className="search__icon dark:text-slate-500" />
      </div>
      <a className="notification notification--light sm:hidden">
        <Search className="notification__icon dark:text-slate-500" />
      </a>
      <div className={`search-result ${showResult ? 'show' : null}`}>
        <div className="search-result__content">
          <div className="search-result__content__title">Pages</div>
          <div className="mb-5">
            <a className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-success dark:bg-success/10">
                <i className="h-4 w-4" data-lucide="inbox" />
              </div>
              <div className="ml-3">Mail Settings</div>
            </a>
            <a className="mt-2 flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pending/10 text-pending">
                <i className="h-4 w-4" data-lucide="users" />
              </div>
              <div className="ml-3">Users &amp; Permissions</div>
            </a>
            <a className="mt-2 flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary/80 dark:bg-primary/20">
                <i className="h-4 w-4" data-lucide="credit-card" />
              </div>
              <div className="ml-3">Transactions Report</div>
            </a>
          </div>
          <div className="search-result__content__title">Users</div>
          <div className="mb-5">
            <a className="mt-2 flex items-center">
              <div className="image-fit h-8 w-8">
                <img
                  alt="Midone - HTML Admin Template"
                  className="rounded-full"
                  src="/src/assets/images/profile-1.jpg"
                />
              </div>
              <div className="ml-3">Russell Crowe</div>
              <div className="ml-auto w-48 truncate text-right text-xs text-slate-500">
                russellcrowe@left4code.com
              </div>
            </a>
            <a className="mt-2 flex items-center">
              <div className="image-fit h-8 w-8">
                <img
                  alt="Midone - HTML Admin Template"
                  className="rounded-full"
                  src="/src/assets/images/profile-11.jpg"
                />
              </div>
              <div className="ml-3">Denzel Washington</div>
              <div className="ml-auto w-48 truncate text-right text-xs text-slate-500">
                denzelwashington@left4code.com
              </div>
            </a>
            <a className="mt-2 flex items-center">
              <div className="image-fit h-8 w-8">
                <img
                  alt="Midone - HTML Admin Template"
                  className="rounded-full"
                  src="/src/assets/images/profile-3.jpg"
                />
              </div>
              <div className="ml-3">Arnold Schwarzenegger</div>
              <div className="ml-auto w-48 truncate text-right text-xs text-slate-500">
                arnoldschwarzenegger@left4code.com
              </div>
            </a>
            <a className="mt-2 flex items-center">
              <div className="image-fit h-8 w-8">
                <img
                  alt="Midone - HTML Admin Template"
                  className="rounded-full"
                  src="/src/assets/images/profile-11.jpg"
                />
              </div>
              <div className="ml-3">Johnny Depp</div>
              <div className="ml-auto w-48 truncate text-right text-xs text-slate-500">
                johnnydepp@left4code.com
              </div>
            </a>
          </div>
          <div className="search-result__content__title">Products</div>
          <a className="mt-2 flex items-center">
            <div className="image-fit h-8 w-8">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/preview-14.jpg"
              />
            </div>
            <div className="ml-3">Samsung Galaxy S20 Ultra</div>
            <div className="ml-auto w-48 truncate text-right text-xs text-slate-500">
              Smartphone &amp; Tablet
            </div>
          </a>
          <a className="mt-2 flex items-center">
            <div className="image-fit h-8 w-8">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/preview-8.jpg"
              />
            </div>
            <div className="ml-3">Sony A7 III</div>
            <div className="ml-auto w-48 truncate text-right text-xs text-slate-500">
              Photography
            </div>
          </a>
          <a className="mt-2 flex items-center">
            <div className="image-fit h-8 w-8">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/preview-5.jpg"
              />
            </div>
            <div className="ml-3">Nike Tanjun</div>
            <div className="ml-auto w-48 truncate text-right text-xs text-slate-500">
              Sport &amp; Outdoor
            </div>
          </a>
          <a className="mt-2 flex items-center">
            <div className="image-fit h-8 w-8">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/preview-8.jpg"
              />
            </div>
            <div className="ml-3">Samsung Galaxy S20 Ultra</div>
            <div className="ml-auto w-48 truncate text-right text-xs text-slate-500">
              Smartphone &amp; Tablet
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
