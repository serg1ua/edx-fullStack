import { type FC } from 'react'
import Button from '../../components/Button/Button'
import type { Plant } from '../../types'
import './styles.css'

const Card: FC<Plant> = (props: Plant) => {
  const { name, image, description, price } = props

  return (
    <div className="card">
      <h3>{name}</h3>
      <img src={image} alt="Plant Image" style={{ width: '200px', height: '200px' }} />
      <p style={{ color: 'red' }}>{price}</p>
      <p>{description}</p>
      <Button title="Add to Cart" onClick={() => console.log('add to cart')} />
    </div>
  )
}

export default Card
