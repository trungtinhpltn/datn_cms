import ErrorPage from 'components/ErrorPage'
import Layout from 'components/Layout'
import { menuInit } from 'contexts/menu'
import Home from 'pages'
import UserShift from 'pages/ca-lam-viec'
import ChangePassword from 'pages/doi-mat-khau'
import LoginPage from 'pages/login'
import ManagerTableFood from 'pages/quan-ly-ban-an'
import TableFoodCreate from 'pages/quan-ly-ban-an/create'
import TableFoodEdit from 'pages/quan-ly-ban-an/edit'
import TableDetail from 'pages/quan-ly-ban-an/TableDetail'
import ManagermentShift from 'pages/quan-ly-ca-lam-viec'
import PersonalJobTime from 'pages/quan-ly-ca-lam-viec/ca-nhan'
import MangermentOrder from 'pages/quan-ly-dat-ban'
import OrderDetail from 'pages/quan-ly-dat-ban/OrderDetail'
import MangermentBill from 'pages/quan-ly-hoa-don'
import BillDetail from 'pages/quan-ly-hoa-don/bill-detail'
import ManagerRestaurant from 'pages/quan-ly-nha-hang'
import RestaurantCreate from 'pages/quan-ly-nha-hang/create'
import RestaurantEdit from 'pages/quan-ly-nha-hang/edit'
import MangermentStaff from 'pages/quan-ly-nhan-vien'
import MangermentStaffCreate from 'pages/quan-ly-nhan-vien/create'
import MangermentStaffEdit from 'pages/quan-ly-nhan-vien/edit'
import MangermentMenuItem from 'pages/quan-ly-thuc-don'
import MenuCategory from 'pages/quan-ly-thuc-don/category'
import MenuItemCreate from 'pages/quan-ly-thuc-don/create'
import MenuItemEdit from 'pages/quan-ly-thuc-don/edit'
import MenuUnit from 'pages/quan-ly-thuc-don/unit'
import UserInfo from 'pages/thong-tin-ca-nhan'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route
} from 'react-router-dom'
import { findByPath } from 'utils/menu'

export const crumb = (match: any) => (
  <Link to={match.pathname}>{findByPath(menuInit, match.pathname)?.name}</Link>
)
export const crumbByDataDisplayName = (nameField: string) => (match: any) =>
  <Link to={match.pathname}>{match.data?.[nameField]}</Link>

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} handle={{ crumb }} />
      <Route
        path="/doi-mat-khau"
        element={<ChangePassword />}
        handle={{ crumb }}
      />
      <Route element={<Layout />}>
        <Route path="/" handle={{ crumb }}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/quan-ly-nha-hang" handle={{ crumb }}>
          <Route index element={<ManagerRestaurant />} />
          <Route path=":id" element={<RestaurantEdit />} />
          <Route
            path="/quan-ly-nha-hang/create"
            element={<RestaurantCreate />}
          />
        </Route>
        <Route path="/quan-ly-ban-an" handle={{ crumb }}>
          <Route index element={<ManagerTableFood />} />
          <Route path="/quan-ly-ban-an/create" element={<TableFoodCreate />} />
          <Route path="/quan-ly-ban-an/edit/:id" element={<TableFoodEdit />} />
          <Route path="/quan-ly-ban-an/:id" element={<TableDetail />} />
        </Route>
        <Route path="/quan-ly-thuc-don" handle={{ crumb }}>
          <Route index element={<MangermentMenuItem />} />
          <Route path="/quan-ly-thuc-don/edit/:id" element={<MenuItemEdit />} />
          <Route path="/quan-ly-thuc-don/create" element={<MenuItemCreate />} />
          <Route path="/quan-ly-thuc-don/category" element={<MenuCategory />} />
          <Route path="/quan-ly-thuc-don/unit" element={<MenuUnit />} />
        </Route>
        <Route path="/quan-ly-hoa-don" handle={{ crumb }}>
          <Route index element={<MangermentBill />} />
          <Route path="/quan-ly-hoa-don/:id" element={<BillDetail />} />
        </Route>
        <Route path="/quan-ly-dat-ban" handle={{ crumb }}>
          <Route index element={<MangermentOrder />} />
          <Route path="/quan-ly-dat-ban/:id" element={<OrderDetail />} />
        </Route>
        <Route path="/quan-ly-nhan-vien" handle={{ crumb }}>
          <Route index element={<MangermentStaff />} />
          <Route
            path="/quan-ly-nhan-vien/create"
            element={<MangermentStaffCreate />}
          />
          <Route
            path="/quan-ly-nhan-vien/edit/:id"
            element={<MangermentStaffEdit />}
          />
          <Route
            path="/quan-ly-nhan-vien/quan-ly-ca-lam-viec"
            element={<ManagermentShift />}
          />
        </Route>
        <Route path="/quan-ly-ca-lam-viec" handle={{ crumb }}>
          <Route index element={<ManagermentShift />} />
          <Route
            path="/quan-ly-ca-lam-viec/ca-nhan"
            element={<PersonalJobTime />}
          />
        </Route>
        <Route path="/thong-tin-ca-nhan" handle={{ crumb }}>
          <Route index element={<UserInfo />} />
        </Route>
        <Route path="/ca-lam-viec" handle={{ crumb }}>
          <Route index element={<UserShift />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)
export default router
