import { type FC } from 'react'
import Button from '../../components/Button/Button'
import type { Plant } from '../../types'
import './styles.css'

type CardProps = Plant & {
  handleAddToCart: (id: string) => void
}

const Card: FC<CardProps> = (props: CardProps) => {
  const { id, name, image, description, price, handleAddToCart } = props

  return (
    <div className="card">
      <h3>{name}</h3>
      <img src={image} alt="Plant Image" style={{ width: '200px', height: '200px' }} />
      <p style={{ color: 'red' }}>{price}</p>
      <p>{description}</p>
      <Button title="Add to Cart" onClick={() => handleAddToCart(id)} />
    </div>
  )
}

export default Card
