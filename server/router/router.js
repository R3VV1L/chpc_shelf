import express from 'express'
import { body } from 'express-validator'
import UserController from '../controller/user-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'

const router = express.Router()

/**
 * TODO: функция регистрациии пользователя
 * @param {
 * email,
 * password,
 * nickname,

 * }
 */

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  UserController.registration,
)

/**
 * TODO: функция подтверждения пользователя
 */

router.get('/activate/:link', UserController.activate)

/**
 * TODO: функция активации пользователя
 */

router.post('/login', UserController.login)

/**
 * TODO: функция смены пароля пользователя
 */

router.post('/changepassword', UserController.ChangePassword)


/**
 * TODO: функция сброса пароля пользователя
 */

router.post('/resetpassword', UserController.ResetPassword)

/**
 * TODO: функция подтверждения сброса пароля пользователя
 */

router.get('/reset/:link', UserController.Reset)

/**
 * TODO: функция повторной отправки письма активации
 */

router.post('/repeatactivate', UserController.RepeatActivate)

/**
 * TODO: выход из аккаунта
 */

router.post('/logout', UserController.logout)

/**
 * TODO: обновление токинов
 */

router.get('/refresh', UserController.refresh)

/**
 * TODO: получение всех пользователей
 */

router.get('/users', authMiddleware, UserController.getUsers)

export default router
