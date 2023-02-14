import AuthService from '../services/AuthService'
import UserService from '../services/UserService'
import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { API_URL } from '../http'

export default class Store {
  user = {}
  isAuth = false
  isLoading = false
  errors = []

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool) {
    this.isAuth = bool
  }

  setUser(user) {
    this.user = user
  }

  setLoading(bool) {
    this.isLoading = bool
  }

  setErrors(array) {
    this.errors = array
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      console.log(this.setAuth)

    } catch (err) {
      this.setErrors(err)
      console.error(err.response?.data?.message)
    }
  }

  async registration(nickname, email, password) {
    try {
      const response = await AuthService.registration(nickname, email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (err) {
      this.setErrors(err)
      console.error(err.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({})
    } catch (err) {
      console.error(err.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      })
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (err) {
      console.log(err.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async ChangePassword(email, OldPassword, NewPassword) {
    // this.setLoading(true)
    this.setErrors(undefined)
    try {
      const response = await UserService.ChangePassword(email, OldPassword, NewPassword)
      console.log(response)

    } catch (err) {
      this.setErrors(err)
      console.error(err.response?.data?.message)
    }
    finally {
      this.setLoading(false)
    }
  }
  async ResetPassword(email) {
    // this.setLoading(true)
    this.setErrors(undefined)
    try {
      const response = await UserService.ResetPassword(email)
      console.log(response)

    } catch (err) {
      this.setErrors(err)
      console.error(err.response?.data?.message)
    }
    finally {
      this.setLoading(false)
    }
  }

  async RepeatActivate(email) {
    // this.setLoading(true)
    this.setErrors(undefined)
    try {
      const response = await UserService.RepeatActivate(email)
      console.log(response)

    } catch (err) {
      this.setErrors(err)
      console.error(err.response?.data?.message)
    }
    finally {
      this.setLoading(false)
    }
  }
}
