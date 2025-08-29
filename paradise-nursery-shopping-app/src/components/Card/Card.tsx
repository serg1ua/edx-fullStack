import { type FC } from 'react'
import Button from '../../components/Button/Button'
import './styles.css'

export type CardProps = {
  [key: string]: string
}

const Card: FC<CardProps> = (props: CardProps) => {
  // const { imgUrl, price, title, description } = props

  return (
    <div className="card">
      <h3>Title</h3>
      <div style={{ backgroundColor: 'green', height: '50%' }}>
        <img src="/plant-grass.svg" alt="Product Image" />
      </div>
      <p style={{ color: 'red' }}>$20</p>
      <p>Some description</p>
      <Button title="Add to Cart" onClick={() => console.log('add to cart')} />
    </div>
  )
}

export default Card
