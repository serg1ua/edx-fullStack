export enum RouteTypes {
  'ROOT' = '/',
  'PRODUCT' = '/product-listing',
  'CART' = '/shopping-cart',
}

export const ROUTES = {
  ROOT: RouteTypes.ROOT,
  PRODUCT: RouteTypes.PRODUCT,
  CART: RouteTypes.CART,
}

export const PAGE_TITLES: Record<RouteTypes, string> = {
  [RouteTypes.ROOT]: 'Paradise nursery shopping landing page',
  [RouteTypes.PRODUCT]: 'Paradise nursery products listing',
  [RouteTypes.CART]: 'Paradise nursery shopping cart',
}
