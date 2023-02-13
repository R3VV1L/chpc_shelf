import api from '../http'

export default class UserService {
    static async ChangePassword(email, OldPassword, NewPassword) {
        return api.post('/changepassword', { email, OldPassword, NewPassword })
    }
    static async ResetPassword(email) {
        return api.post('/resetpassword', { email })
    }

}

