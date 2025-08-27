import { ROUTES } from './constants'

export const routeConfig = [
  {
    path: ROUTES.ROOT,
    element: <>Landing Page</>,
  },
  {
    path: ROUTES.PRODUCT,
    element: <>Product</>,
  },

  {
    path: ROUTES.CART,
    element: <>Cart</>,
    index: false,
  },
  {
    path: '*',
    element: <>404 Page Not Found</>,
  },
]
