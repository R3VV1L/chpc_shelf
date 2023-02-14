import style from "../pages/authorization/Authorization.module.scss"
import { LoginCheck, PasswordCheck } from '../pages/authorization/AuthorizationLogic.jsx'
import Avatar from '../assets/images/Avatar_Logo_UpScaled.png'
import Logo from './UI/Logo'
import { Button, Col, Row, Container, Form, FloatingLabel, Alert } from 'react-bootstrap';
import React, { useState, useContext } from 'react'
import axios from 'axios';
import Title from "./UI/Title";
import CHPButton from "./UI/CHPButton";
import CHPInput from "./UI/CHPInput";
import { Link, redirect } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import MSG from "./UI/MSG";

function AuthorizationForm() {

    const { store } = useContext(Context)
    if (store.isLoading) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    }
    /*Состояния для хранения значений полей ввода */
    const [Login, setLogin] = useState("");
    const [Password, setPassword] = useState("");

    /* Наполнение ошибок полей ввода */
    const [Login_Error_Type, setLogin_Error_Type] = useState("");
    const [Password_Error_Type, setPassword_Error_Type] = useState("");

    const [MSGtype, setMSGtype] = useState("error");
    /* массив для хранения кодов ошибок полей */
    let Errors = ["", ""]


    function DataCheck() {
        setMSGtype("error")
        /* заполнение массива значениями ошибок */
        Errors[0] = LoginCheck(Login)
        Errors[1] = PasswordCheck(Password)

        /* проверка поля Login на тип ошибки и изменение его состояния */

        setLogin_Error_Type(LoginCheck(Login));
        /* проверка поля Password на тип ошибки и изменение его состояния */
        setPassword_Error_Type(PasswordCheck(Password));

        /* проверка всех полей на ошибки и обнуление из состояния в случае их отсутствия */
        if (Errors[0] === "") {
            setLogin_Error_Type("");
        }

        if (Errors[1] === "") {
            setPassword_Error_Type("");
        }

        /* проверка соответствия всех полей и вызов функции отправки данных */
        if (Errors[0] === "" && Errors[1] === "") {

            async function response() {
                await store.login(Login, Password)
                console.log(store?.errors?.response?.data?.message);
                setLogin_Error_Type(store?.errors?.response?.data?.message)
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
                <Title>Log in</Title>
            </Row>

            {/* поля ввода ника и его ошибки */}
            <div className="Content__right__Input_group">
                <MSG type={MSGtype}>{Login_Error_Type}</MSG>
                <CHPInput value={Login} name="Login" type='text' placeholder={"Login is your email"} maxLength={40} onChange={(event) => setLogin(event.target.value)} />
            </div>

            {/* поля ввода пароля и его ошибки */}
            <div className="Content__right__Input_group">
                <MSG type={MSGtype}>{Password_Error_Type}</MSG>
                <CHPInput value={Password} name="Password" type='password' placeholder={"Password"} maxLength={32} onChange={(event) => setPassword(event.target.value)} />
            </div>

            {/* кнопка */}
            <CHPButton className={style.MainButton} value={"Log in"} type="button" onClick={DataCheck} />


            <Link to="/registration"><CHPButton className={style.RerouteButton} value={"Registrate"} type="button" /></Link>
            <Link to="/login-help"><CHPButton className={style.ResetButton} value={"Login problem"} type="button" /></Link>


        </Container>
    )

}


export default observer(AuthorizationForm);