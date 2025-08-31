import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import Cart from '../Cart/Cart'
import './styles.css'

const Header: FC = () => {
  const navigate = useNavigate()

  const navigateToCart = () => {
    navigate(ROUTES.CART)
  }

  return (
    <header>
      <div className="logo">
        <p>Logo here</p>
      </div>

      <div className="title">
        <h2>Paradise Nursery</h2>
        <p>
          <i>Where Green Meets Serenity</i>
        </p>
      </div>
      <div className="plants">
        <p>Plants</p>
      </div>
      <div className="cart">
        <Cart onClick={navigateToCart} />
      </div>
    </header>
  )
}

export default Header
