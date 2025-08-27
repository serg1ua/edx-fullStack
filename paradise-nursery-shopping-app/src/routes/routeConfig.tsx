import Cart from '../pages/ShoppingCart/ShoppingCart'
import Landing from '../pages/Home/Home'
import Product from '../pages/Product/Product'
import { ROUTES } from './constants'

export const routeConfig = [
  {
    path: ROUTES.ROOT,
    element: <Landing />,
  },
  {
    path: ROUTES.PRODUCT,
    element: <Product />,
  },
  {
    path: ROUTES.CART,
    element: <Cart />,
  },
  {
    path: '*',
    element: <h2>404 Page Not Found</h2>,
  },
]
