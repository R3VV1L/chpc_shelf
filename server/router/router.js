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
 * last_name,
 * first_name,
 * patronymic,
 * age,
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
