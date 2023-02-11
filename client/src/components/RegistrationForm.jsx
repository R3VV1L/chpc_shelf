import style from "../pages/registration/Registration.module.scss"
import { NicknameCheck, EmailCheck, PasswordCheck, Check_passwordCheck } from '../pages/registration/RegistrationLogic.jsx'
import Avatar from '../assets/images/Avatar_Logo_UpScaled.png'
import Logo from './UI/Logo'
import { Button, Col, Row, Container, Form, FloatingLabel, Alert } from 'react-bootstrap';
import React, { useState, useContext } from 'react'
import axios from 'axios';
import Title from "./UI/Title";
import CHPButton from "./UI/CHPButton";
import CHPInput from "./UI/CHPInput";
import { Link } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import MSG from "./UI/MSG";

function RegistrationForm() {

    const { store } = useContext(Context)
    if (store.isLoading) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>

    }
    /*Состояния для хранения значений полей ввода */
    const [Nickname, setNickname] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Check_password, setCheck_password] = useState("");

    /* Наполнение ошибок полей ввода */
    const [Nickname_Error_Type, setNickname_Error_Type] = useState("");
    const [Email_Error_Type, setEmail_Error_Type] = useState("");
    const [Password_Error_Type, setPassword_Error_Type] = useState("");
    const [Check_password_Error_Type, setCheck_password_Error_Type] = useState("");
    /* состояние чекбокса политики и его изменение*/
    const [Checked, setCheck_status] = useState(false);
    const [MSGtype, setMSGtype] = useState("error");
    function Checker() {
        if (Checked === false) {
            setCheck_status(true)
            console.log("Checked set true");
        }
        else {
            setCheck_status(false)
            console.log("Checked set false");
        }
    }
    /* массив для хранения кодов ошибок полей */
    let Errors = ["", "", "", ""]
    /* проверка значений состояния полей и их изменения */
    function DataCheck() {
        setMSGtype("error")
        /* заполнение массива значениями ошибок */
        Errors[0] = NicknameCheck(Nickname)
        Errors[1] = EmailCheck(Email)
        Errors[2] = PasswordCheck(Password)
        Errors[3] = Check_passwordCheck(Password, Check_password)

        /* проверка поля ника на тип ошибки и изменение его состояния */

        setNickname_Error_Type(NicknameCheck(Nickname));


        /* проверка поля почты на тип ошибки и изменение его состояния */

        setEmail_Error_Type(EmailCheck(Email))

        /* проверка поля пароля на тип ошибки и изменение его состояния */

        setPassword_Error_Type(PasswordCheck(Password))


        /* проверка поля повтора пароля на тип ошибки и изменение его состояния */


        setCheck_password_Error_Type(Check_passwordCheck(Check_password))



        /* проверка всех полей на ошибки и обнуление из состояния в случае их отсутствия */
        if (Errors[0] === "") {
            setNickname_Error_Type("");
        }
        if (Errors[1] === "") {
            setEmail_Error_Type("");
        }
        if (Errors[2] === "") {
            setPassword_Error_Type("");
        }
        if (Errors[3] === "") {
            setCheck_password_Error_Type('');
        }
        /* проверка соответствия всех полей и вызов функции отправки данных */
        if (Errors[0] === "" && Errors[1] === "" && Errors[2] === "" && Errors[3] === "") {


            async function response() {
                await store.registration(Nickname, Email, Password)
                console.log(store?.errors?.response?.data?.message);
                setEmail_Error_Type(store?.errors?.response?.data?.message)
            }
            response()

        }

    }




    /* сам рендер */
    return (
        <Container className='Content Content__right'>
            {/* заголовок и аватарка */}
            <Logo url={Avatar} className={style.Avatar} />
            <Row>
                <Title>Registration</Title>
            </Row>

            {/* основное поле */}
            {/* поля ввода */}
            {/* поля ввода ника и его ошибки */}
            <div className="Content__right__Input_group">
                <MSG type={MSGtype}>{Nickname_Error_Type}</MSG>
                <CHPInput value={Nickname} name="Nickname" type='text' placeholder={"Nickname"} maxLength={40} onChange={(event) => setNickname(event.target.value)} />
            </div>
            {/* поля ввода почты и его ошибки */}
            <div className="Content__right__Input_group">
                <MSG type={MSGtype}>{Email_Error_Type}</MSG>
                <CHPInput value={Email} name="Email" type='text' placeholder={"Email"} maxLength={32} onChange={(event) => setEmail(event.target.value)} />
            </div>
            {/* поля ввода пароля и его ошибки */}
            <div className="Content__right__Input_group">
                <MSG type={MSGtype}>{Password_Error_Type}</MSG>
                <CHPInput value={Password} name="Password" type='password' placeholder={"Password"} maxLength={32} onChange={(event) => setPassword(event.target.value)} />
            </div>
            {/* поля ввода повтора пароля и его ошибки */}
            <div className="Content__right__Input_group">
                <MSG type={MSGtype}>{Check_password_Error_Type}</MSG>
                <CHPInput value={Check_password} name="Check_password" type='password' placeholder={"Repeat the password"} maxLength={32} onChange={(event) => setCheck_password(event.target.value)} />
            </div>
            {/* чекбокс */}
            <div className="Content__right__Input_group__checker">
                <input className="form-check-input" type="checkbox" value="" onChange={Checker} />
                <label className="form-check-label">
                    "I agreed to <a href="">sell</a> my soul"
                </label>
            </div>
            {/* кнопка */}
            <CHPButton className={style.MainButton} value={"Registrate"} type="button" disabled={Checked ? false : true} onClick={DataCheck} />
            <Link to="/authorization"><CHPButton className={style.RerouteButton} value={"Log in"} type="button" /></Link>


        </Container>
    )
}



export default observer(RegistrationForm);