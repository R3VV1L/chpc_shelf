/* шаблоны для валидации */
var format_nickname = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;// valid _
var format_email = /[ `!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;// valid . @ _
var format_must_email = /[@]/;
var format_password = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;// valid _ .
/* проверка валидации никнейма */
export function NicknameCheck(Nickname) {
    if (Nickname === "" || Nickname === " ") {
        return "You can't leave this field empty";
    }
    else if (Nickname.length < 3) {
        return "Nickname must have more then 3 symboles";
    }
    else if (format_nickname.test(Nickname)) {
        return "Nickname mustn`t have special symboles";
    }
    else {
        return "";
    }
}

/* проверка валидации Почты */
export function EmailCheck(Email) {
    if (Email === "" || Email === " ") {
        return "You can't leave this field empty";
    }
    else if (format_email.test(Email)) {
        return "Email mustn`t have special symboles";
    }
    else if (format_must_email.test(Email) === false) {
        return "Email must have @ and . symboles";
    }
    else {
        return '';
    }
}


/* проверка валидации Пароля */
export function PasswordCheck(Password) {
    if (Password === "" || Password === " ") {
        return "You can't leave this field empty";
    }
    else if (Password.length < 6) {
        return "Password must have more then 6 symboles";
    }
    else if (Password.length >= 33) {
        return "Password must have less then 32 symboles";
    }
    else if (format_password.test(Password)) {
        return "Password mustn`t have special symboles";
    }
    else {
        return "";
    }
}

/* проверка пароля на его совпадение */
export function Check_passwordCheck(Password, Check_password) {
    if (Password !== Check_password) {
        return "Passwords are not the same!";
    }
    else {
        return "";
    }
}