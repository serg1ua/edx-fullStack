import { useEffect, type FC } from 'react'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import { useGetAllPlantsQuery } from '../../redux/api'
import { useSelector } from '../../redux/store'
import './styles.css'

const Product: FC = () => {
  const { refetch, isFetching } = useGetAllPlantsQuery({})
  const plants = useSelector((state) => state.plants)

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
          plants.map((plant) => (
            <div className="product" key={plant.id}>
              <Card {...plant} />
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Product
