import type { FC } from 'react'
import { useDispatch, useSelector } from '../../redux/store'
import { addCartItem, deleteCartItems } from '../../redux/slice/cartSlice'
import Header from '../../components/Header/Header'
import CartItem from '../../components/CartItem/CartItem'
import type { Plant } from '../../types'
import './styles.css'

const ShoppingCart: FC = () => {
  const dispatch = useDispatch()
  const plants = useSelector((state) => state.plants)
  const cartItems = useSelector((state) => state.cart)

  const uniqCartItems = [...new Set(cartItems)]

  const plantsInCart = plants.reduce((acc: Plant[], curr: Plant) => {
    if (uniqCartItems.includes(curr.id)) {
      acc.push(curr)
    }
    return acc
  }, [])

  const contCartItemsById = (id: string) => cartItems.filter((cartItem) => cartItem === id).length

  const getCartTotal = () =>
    cartItems.reduce((acc, curr) => {
      const plant = plantsInCart.find((plant) => plant.id === curr)
      acc += plant?.price ?? 0
      return acc
    }, 0)

  const handleIncrement = (id: string) => {
    dispatch(addCartItem(id))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteCartItems(id))
  }

  return (
    <>
      <Header />
      <div className="shopping-cart">
        <h3>{cartItems.length ? `Total Cart Amount: $${getCartTotal()}` : 'Your Cart Empty'}</h3>
        {plantsInCart.map(({ id, name, image, price }) => (
          <div key={id}>
            <CartItem
              id={id}
              name={name}
              image={image}
              price={price}
              contCartItemsById={contCartItemsById}
              handleIncrement={handleIncrement}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ShoppingCart
