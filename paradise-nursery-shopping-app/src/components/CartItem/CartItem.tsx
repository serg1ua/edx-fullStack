import { type FC } from 'react'
import Button from '../../components/Button/Button'
import Counter from '../Counter/Counter'
import './styles.css'

type CartItemProps = {
  id: string
  name: string
  price: number
  image?: string
  contCartItemsById: (id: string) => number
  handleIncrement: (id: string) => void
  handleDecrement: (id: string) => void
  handleDelete: (id: string) => void
}

const CartItem: FC<CartItemProps> = ({
  id,
  name,
  image,
  price,
  contCartItemsById,
  handleIncrement,
  handleDecrement,
  handleDelete,
}: CartItemProps) => {
  return (
    <div className="cart-item">
      <div className="card-image">
        <img src={image} alt="Plant Image" style={{ width: '200px', height: '200px' }} />
      </div>
      <div className="card-content">
        <h3 className="content">{name}</h3>
        <p className="content">${price}</p>
        <Counter
          count={contCartItemsById(id)}
          onDecrement={() => handleDecrement(id)}
          onIncrement={() => handleIncrement(id)}
        />
        <p className="content">Total: ${contCartItemsById(id) * Number(price)}</p>
        <Button classes="delete-btn" title="Delete" onClick={() => handleDelete(id)} />
      </div>
    </div>
  )
}

export default CartItem
