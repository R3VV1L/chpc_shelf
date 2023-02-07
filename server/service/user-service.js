import UserModel from '../model/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import mailService from './mail-service.js'
import tokenService from './token-service.js'
import { UserDto } from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'
import roleService from './role-service.js'

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

  async getAllUsers() {
    const users = await UserModel.findAll()
    return users
  }
}

export default new UserService()
