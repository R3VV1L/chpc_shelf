import RoleModel from './role-model.js'
import TokenModel from './token-model.js'
import UserModel from './user-model.js'
import UserDetailsModel from './user_deteils-model.js'

class Test {
  async test() {
    await RoleModel.sync()
    await TokenModel.sync()
    await UserModel.sync()
    await UserDetailsModel.sync()

    // await RoleModel.create({
    //   role: 'User',
    // })

    // Регистрируемся в супер пупер приложении

    // await UserDetailsModel.create({
    //   role: 1,
    //   user: 1
    // })
  }
}
export default new Test()
