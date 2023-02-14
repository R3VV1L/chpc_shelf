import UserModel from '../model/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import mailService from './mail-service.js'
import tokenService from './token-service.js'
import { UserDto } from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'
import roleService from './role-service.js'
import { where } from 'sequelize'

class UserService {
  async registration(email, nickname, password) {
    const candidate = await UserModel.findOne({ where: { email } })
    if (candidate) {
      throw ApiError.BedRequest(`Почта ${email} уже занята!`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()

    const user = await UserModel.create({
      email,
      nickname,
      password: hashPassword,
      activationLink,
    })

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    )

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    throw ApiError.BedRequest(
      'Перейдите в свой почтовый ящик и активируйте аккаунт',
    )
    // return {
    //   ...tokens,
    //   user: userDto,
    // }
  }

  async login(email, password) {
    const user = await UserModel.findOne({ where: { email: email } })
    if (!user) {
      throw ApiError.BedRequest('Пользователь с таким email не найден')
    }

    if (!user.isActivated) {
      throw ApiError.BedRequest(
        'Перейдите в свой почтовый ящик и активируйте аккаунт',
      )
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BedRequest('Не верный пароль')
    }

    user['roles'] = await roleService.getRoles(user.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }


  async ChangePassword(email, OldPassword, NewPassword) {
    const user = await UserModel.findOne({ where: { email: email } })

    const isPassEquals = await bcrypt.compare(OldPassword, user.password)
    if (!isPassEquals) {
      throw ApiError.BedRequest('Не верный пароль')
    }

    const hashPassword = await bcrypt.hash(NewPassword, 3)


    try {
      const result = await UserModel.update(
        { password: hashPassword },
        { where: { email: email } }
      )
    } catch (err) {
      throw ApiError.BedRequest(err)
    }

    // await UserModel.update({

    //   password: hashPassword

    // })

    // const activationLink = uuidv4()

    // const user = await UserModel.create({
    //   email,
    //   nickname,
    //   password: hashPassword,
    //   activationLink,
    // })

    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`,
    // )

    // const userDto = new UserDto(user)
    // const tokens = tokenService.generateTokens({ ...userDto })

    // await tokenService.saveToken(userDto.id, tokens.refreshToken)

    // throw ApiError.BedRequest(
    //   'Перейдите в свой почтовый ящик и активируйте аккаунт',
    // )
  }

  async ResetPassword(email) {
    const user = await UserModel.findOne({ where: { email: email } })
    if (!user) {
      throw ApiError.BedRequest('Пользователь с таким email не найден')
    }

    if (!user.isActivated) {
      throw ApiError.BedRequest(
        'Сперва активируйте аккаунт',
      )
    }


    try {
      const ResetLink = uuidv4()
      const result = await UserModel.update(
        { activationLink: ResetLink },
        { where: { email: email } }
      )
      await mailService.sendResetMail(
        email,
        `${process.env.API_URL}/api/reset/${ResetLink}`,
      )
      throw ApiError.BedRequest(
        'Перейдите в свой почтовый ящик',
      )
    } catch (err) {
      throw ApiError.BedRequest(err)
    }
  }


  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({
      where: {
        activationLink,
      },
    })

    if (!user) {
      throw new ApiError.BedRequest('Неккоректная ссылка активации')
    }

    user.isActivated = true
    await user.save()
  }


  async Reset(activationLink) {
    const user = await UserModel.findOne({
      where: {
        activationLink,
      },
    })

    if (!user) {
      throw ApiError.BedRequest('Неккоректная ссылка восстановления')
    }
    const email = user.email
    const hashPassword = await bcrypt.hash(user.email, 3)
    const newLink = uuidv4()
    const result = await UserModel.update(
      { password: hashPassword },
      // { activationLink: newLink },
      { where: { email: email } }
    )
    const result1 = await UserModel.update(
      // { password: hashPassword },
      { activationLink: newLink },
      { where: { email: email } }
    )
    // const result = await UserModel.update
    //   (
    //     { password: hashPassword },
    //     { activationLink: newLink },
    //     { where: { email } }
    //   )


  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData && !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findOne({ where: { id: userData.id } })
    user['roles'] = await roleService.getRoles(user.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }

  async RepeatActivate(email) {
    const user = await UserModel.findOne({ where: { email: email } })
    if (!user) {
      throw ApiError.BedRequest('Пользователь с таким email не найден')
    }

    try {
      const activationLink = user.activationLink

      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`,
      )
      throw ApiError.BedRequest(
        'Перейдите в свой почтовый ящик',
      )
    } catch (err) {
      throw ApiError.BedRequest(err)
    }
  }

  async getAllUsers() {
    const users = await UserModel.findAll()
    return users
  }
}

export default new UserService()
