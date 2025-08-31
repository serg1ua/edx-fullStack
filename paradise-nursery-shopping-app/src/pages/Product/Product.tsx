import { useEffect, type FC } from 'react'
import { useGetAllPlantsQuery } from '../../redux/api'
import { useDispatch, useSelector } from '../../redux/store'
import type { Plant } from '../../types'
import { setCartItem } from '../../redux/slice/cartSlice'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import './styles.css'

const Product: FC = () => {
  const dispatch = useDispatch()

  const { refetch, isFetching } = useGetAllPlantsQuery({})
  const plants = useSelector((state) => state.plants)

  const sortedPlants = plants.reduce((acc: { [key: string]: Plant[] }, curr: Plant) => {
    if (acc[curr.category]) {
      acc[curr.category].push(curr)
    } else {
      acc[curr.category] = [curr]
    }
    return acc
  }, {})

  const handleAddToCart = (id: string) => {
    dispatch(setCartItem(id))
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
              <div
                key={category}
                className="product-category-wrapper"
                style={{ textAlign: 'center' }}
              >
                <hr />
                <h2>{category}</h2>
                <hr />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {sortedPlants[category].map((plant) => (
                    <div className="product" key={plant.id}>
                      <Card {...plant} handleAddToCart={handleAddToCart} />
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
