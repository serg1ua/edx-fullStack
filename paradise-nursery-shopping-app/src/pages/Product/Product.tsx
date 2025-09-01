import { useEffect, type FC } from 'react'
import { useGetAllPlantsQuery } from '../../redux/api'
import { useDispatch, useSelector } from '../../redux/store'
import type { Plant } from '../../types'
import { addCartItem } from '../../redux/slice/cartSlice'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import './styles.css'

const Product: FC = () => {
  const dispatch = useDispatch()

  const { refetch, isFetching } = useGetAllPlantsQuery({})

  const plants = useSelector((state) => state.plants)
  const cartItems = useSelector((state) => state.cart)

  const sortedPlants = plants.reduce((acc: { [key: string]: Plant[] }, curr: Plant) => {
    if (acc[curr.category]) {
      acc[curr.category].push(curr)
    } else {
      acc[curr.category] = [curr]
    }
    return acc
  }, {})

  const handleAddToCart = (id: string) => {
    dispatch(addCartItem(id))
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <>
      <Header />
      <div className="products">
        {isFetching ? (
          <div className="loading">loading...</div>
        ) : (
          Object.keys(sortedPlants)
            .sort()
            .map((category) => (
              <div key={category} className="product-category-wrapper">
                <hr />
                <h2>{category}</h2>
                <hr />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  {sortedPlants[category].map((plant) => (
                    <div className="product" key={plant.id}>
                      <Card
                        {...plant}
                        isInCart={cartItems.includes(plant.id)}
                        handleAddToCart={handleAddToCart}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
    </>
  )
}

export default Product
