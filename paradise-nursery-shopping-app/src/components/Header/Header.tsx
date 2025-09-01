import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from '../../redux/store'
import { ROUTES } from '../../routes'
import Cart from '../Cart/Cart'
import './styles.css'

const Header: FC = () => {
  const cartItems = useSelector((state) => state.cart)

  const navigate = useNavigate()

  const navigateHome = () => {
    navigate(ROUTES.ROOT)
  }

  const navigateToProduct = () => {
    navigate(ROUTES.PRODUCT)
  }

  const navigateToCart = () => {
    navigate(ROUTES.CART)
  }

  return (
    <header>
      <div onClick={navigateHome} className="logo">
        <img src="/plant.png" alt="Logo" />
        <div className="title">
          <h2>Paradise Nursery</h2>
          <p>
            <i>Where Green Meets Serenity</i>
          </p>
        </div>
      </div>

      <div onClick={navigateToProduct} className="plants">
        <h2>Plants</h2>
      </div>
      <div className="cart">
        <Cart onClick={navigateToCart} numberOfItems={cartItems.length} />
      </div>
    </header>
  )
}

export default Header
