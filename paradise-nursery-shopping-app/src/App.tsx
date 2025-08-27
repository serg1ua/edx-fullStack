import { useRoutes } from 'react-router-dom'
import { routeConfig } from './routes'
import './App.css'

function App() {
  const routes = useRoutes(routeConfig)

  return <>{routes}</>
}

export default App
