import type { FC } from 'react'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import './styles.css'

const cards = [<Card />, <Card />, <Card />, <Card />, <Card />]

const Product: FC = () => {
  return (
    <>
      <Header />
      <div className="products">
        {cards.map((card) => (
          <div className="product">{card}</div>
        ))}
      </div>
    </>
  )
}

export default Product
