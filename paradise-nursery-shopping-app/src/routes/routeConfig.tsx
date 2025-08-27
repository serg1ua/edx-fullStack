import Cart from '../pages/cart/Cart'
import Landing from '../pages/landing/Landing'
import Product from '../pages/product/Product'
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
