import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from './main'
import './assets/css/style.scss'
import Registration from './pages/registration/Registration'
import MainForm from './pages/main/MainForm'
import {
  Link,
  Route,
  Routes
} from 'react-router-dom'
function App() {
  const { store } = useContext(Context)
  console.log(store.isAuth)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  }

  if (!store.isAuth) {
    return <Registration />

  }

  return (
    <div className="App">
      <MainForm />
    </div>
  )
}

export default observer(App)
