import api from '../http'

export default class AuthService {
    static async ChangePassword(email, OldPassword, NewPassword) {
        return api.post('/changepassword', { email, OldPassword, NewPassword })
    }

}

