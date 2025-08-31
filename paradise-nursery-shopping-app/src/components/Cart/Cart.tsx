import { type FC } from 'react'
import './styles.css'

export type CartProps = {
  onClick: () => void
  numberOfItems?: number
}

const Cart: FC<CartProps> = (props: CartProps) => {
  const { numberOfItems = 10, onClick } = props

  return (
    <div className="cart-inner" onClick={onClick}>
      <img src="/src/assets/cart.svg" alt="Shopping Cart Icon" />
      <p
        className="items-number"
        style={{
          bottom: numberOfItems > 99 ? '12px' : 0,
          right:
            numberOfItems > 1 && numberOfItems <= 99 ? '8px' : numberOfItems > 99 ? '10px' : '16px',
          fontSize: numberOfItems > 99 ? '16px' : '24px',
        }}
      >
        {numberOfItems}
      </p>
    </div>
  )
}

export default Cart
