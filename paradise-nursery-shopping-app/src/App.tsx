import { Provider } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { routeConfig } from './routes'
import { persistor, store } from './redux/store'

function App() {
  const routes = useRoutes(routeConfig)

  return (
    <Provider store={store}>
      <PersistGate loading={<>loading...</>} persistor={persistor}>
        {routes}
      </PersistGate>
    </Provider>
  )
}

export default App
