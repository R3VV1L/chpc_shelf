import userService from '../service/user-service.js'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error.js'

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BedRequest('Некорректный Email', errors.array()))
      }
      const { email, nickname, password } = req.body

      const userData = await userService.registration(
        email,
        nickname,
        password,
      )

      res.cookie('refreshToken', userData?.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData?.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async activate(req, res) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
      next(err)
    }
  }

  async ChangePassword(req, res, next) {
    try {

      const { email, OldPassword, NewPassword } = req.body

      const userData = await userService.ChangePassword(
        email,
        OldPassword,
        NewPassword
      )

      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async ResetPassword(req, res, next) {
    try {

      const { email } = req.body

      const userData = await userService.ResetPassword(
        email
      )

      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async Reset(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.Reset(activationLink)


      return res.redirect(process.env.CLIENT_URL)


    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)

      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (err) {
      next(err)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()
