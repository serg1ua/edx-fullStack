import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import Button from '../../components/Button/Button'
import './styles.css'

const Home: FC = () => {
  const navigate = useNavigate()

  const navigateToProduct = (): void => {
    navigate(ROUTES.PRODUCT)
  }

  return (
    <div className="landing">
      <section className="welcome">
        <h1>Welcome To</h1>
        <h1>Paradise Nursery</h1>
        <hr />
        <h3> Where Green Meets Serenity</h3>
        <Button title="Get Started" onClick={navigateToProduct} />
      </section>
      <section className="description">
        <h2>Welcome to Paradise Nursery, where green meets</h2>
        <p>
          At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is
          to provide a wide range of high-quality plants that not only enhance the beauty of your
          surroundings but also contribute to a healthier and more sustainable lifestyle. From
          air-purifying plants to aromatic fragrant ones, we have something for every plant
          enthusiast. Our team of experts is dedicated to ensuring that each plant meets our strict
          standards of quality and care. Whether you're a seasoned gardener or just starting your
          green journey, we're here to support you every step of the way. Feel free to explore our
          collection, ask questions, and let us help you find the perfect plant for your home or
          office. Join us in our mission to create a greener, healthier world. Visit Paradise
          Nursery today and experience the beauty of nature right at your
        </p>
      </section>
    </div>
  )
}

export default Home
