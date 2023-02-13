import style from "../pages/authorization/Authorization.module.scss"
import { EmailCheck } from '../pages/registration/RegistrationLogic.jsx'
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

function ResetForm() {

    const { store } = useContext(Context)
    if (store.isLoading) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    }
    /*Состояния для хранения значений полей ввода */
    const [Email, setEmail] = useState("");


    /* Наполнение ошибок полей ввода */
    const [Email_Error_Type, setEmail_Error_Type] = useState("");


    const [MSGtype, setMSGtype] = useState("error");
    /* массив для хранения кодов ошибок полей */


    function DataCheck() {
        setMSGtype("error")
        /* заполнение массива значениями ошибок */


        /* проверка поля Login на тип ошибки и изменение его состояния */

        setEmail_Error_Type(EmailCheck(Email));
        /* проверка поля Password на тип ошибки и изменение его состояния */

        /* проверка всех полей на ошибки и обнуление из состояния в случае их отсутствия */
        if (EmailCheck(Email) === "") {
            setEmail_Error_Type("");
            async function response() {
                await store.ResetPassword(Email)
                console.log(store?.errors?.response?.data?.message);
                setMSGtype('success')
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
                <Title>Password</Title>
            </Row>
            <Row>
                <Title>Reset</Title>
            </Row>

            {/* поля ввода ника и его ошибки */}
            <div className="Content__right__Input_group">
                <MSG type={MSGtype}>{Email_Error_Type}</MSG>
                <CHPInput value={Email} name="Email" type='text' placeholder={"Write here your Email"} maxLength={40} onChange={(event) => setEmail(event.target.value)} />
            </div>

            {/* кнопка */}
            <CHPButton className={style.MainButton} value={"Send reset mail"} type="button" onClick={DataCheck} />


            <Link to="/registration"><CHPButton className={style.RerouteButton} value={"Registrate"} type="button" /></Link>
            <Link to="/authorization"><CHPButton className={style.RerouteButton} value={"Log In"} type="button" /></Link>



        </Container>
    )

}


export default observer(ResetForm);