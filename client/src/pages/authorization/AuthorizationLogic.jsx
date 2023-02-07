/* шаблоны для валидации */
var format_login = /[ `!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;// valid . @ _
/* проверка валидации никнейма */
export function LoginCheck(Login) {
    if (Login === "" || Login === " ") {
        return "You can not leave this field empty";
    }
    else if (Login.length < 3) {
        return "Your login must have more then 3 symbols";
    }
    else if (format_login.test(Login)) {
        return "Login can only contain a-z A-Z 0-9 @._";
    }
    else {
        return "";
    }
}
export function PasswordCheck(Password) {
    if (Password === "" || Password === " ") {
        return "You can not leave this field empty";
    }
    else {
        return "";
    }
}
