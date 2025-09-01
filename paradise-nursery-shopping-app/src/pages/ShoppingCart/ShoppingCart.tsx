import type { FC } from 'react'
import { useDispatch, useSelector } from '../../redux/store'
import { setCartItem } from '../../redux/slice/cartSlice'
import Header from '../../components/Header/Header'
import type { Plant } from '../../types'
import Button from '../../components/Button/Button'
import './styles.css'
import Counter from '../../components/Counter/Counter'

const ShoppingCart: FC = () => {
  const plants = useSelector((state) => state.plants)
  const cartItems = useSelector((state) => state.cart)

  const uniqCartItems = [...new Set(cartItems)]

  const plantsInCart = plants.reduce((acc: Plant[], curr: Plant) => {
    if (uniqCartItems.includes(curr.id)) {
      acc.push(curr)
    }
    return acc
  }, [])

  return (
    <>
      <Header />
      <div className="shopping-cart">
        <h3>Total Cart Amount:</h3>
        {plantsInCart.map(({ id, name, image, price }) => (
          <div className="shopping-cart-card" key={id}>
            <div className="shopping-cart-card-image">
              <img src={image} alt="Plant Image" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="shopping-cart-card-content">
              <h3 className="content">{name}</h3>
              <p className="content">{price}</p>
              <Counter
                onDecrement={() => console.log('decrement')}
                onIncrement={() => console.log('increment')}
              />
              <p className="content">Total: $</p>
              <Button classes="delete-btn" title="Delete" onClick={() => {}} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ShoppingCart
