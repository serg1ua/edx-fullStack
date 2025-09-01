import { type FC } from 'react'
import Button from '../../components/Button/Button'
import type { Plant } from '../../types'
import './styles.css'

type CardProps = Plant & {
  handleAddToCart: (id: string) => void
  isInCart?: boolean
}

const Card: FC<CardProps> = (props: CardProps) => {
  const { isInCart = false, id, name, image, description, price, handleAddToCart } = props

  return (
    <div className="card">
      <h3>{name}</h3>
      <img src={image} alt="Plant Image" style={{ width: '200px', height: '200px' }} />
      <p className="price">${price}</p>
      <p>{description}</p>
      <Button disabled={isInCart} title="Add to Cart" onClick={() => handleAddToCart(id)} />
    </div>
  )
}

export default Card
