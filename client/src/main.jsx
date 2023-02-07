import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Store from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

const store = new Store()

export const Context = createContext({
  store,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider
    value={{
      store,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>,
)
