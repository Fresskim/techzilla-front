import { PersistGate } from 'redux-persist/integration/react'
import AppRoutes from './routes/routes'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
const persistor = persistStore(store)

  return (
   <Provider store={store}>
    
    <PersistGate loading={null} persistor={persistor}>
    <AppRoutes/>
    <ToastContainer />

    </PersistGate>

   </Provider>
  )
}

export default App
