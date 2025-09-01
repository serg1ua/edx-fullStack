import type { FC } from 'react'
import { useDispatch, useSelector } from '../../redux/store'
import { setCartItem } from '../../redux/slice/cartSlice'
import Header from '../../components/Header/Header'
import type { Plant } from '../../types'
import Button from '../../components/Button/Button'
import './styles.css'

const ShoppingCart: FC = () => {
  const plants = useSelector((state) => state.plants)
  const cartItems = useSelector((state) => state.cart)
  const uniqCartItems = [...new Set(cartItems)]

  const plantsInCart = plants.reduce((acc: Plant[], curr: Plant) => {
    if (uniqCartItems.includes(curr.id)) {
      console.log(curr)
      acc.push(curr)
    }
    return acc
  }, [])

  return (
    <>
      <Header />
      <div className="shopping-cart">
        <h3>Total Cart Amount:</h3>
        {plantsInCart.map(({ id, name, image, price, description }) => (
          <div className="shopping-cart-card" key={id}>
            <h3>{name}</h3>
            <img src={image} alt="Plant Image" style={{ width: '200px', height: '200px' }} />
            <p className="shopping-cart-price">{price}</p>
            <p>{description}</p>
            <Button title="Add to Cart" onClick={() => {}} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ShoppingCart
