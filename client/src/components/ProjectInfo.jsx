import React, { Component } from 'react'
import Logo from "../components/UI/Logo.jsx"
import LogoIMG from '../assets/images/Logo3.png'
import style from "../pages/registration/Registration.module.scss"
export default class ProjectInfo extends Component {
    render() {
        return (
            <div className='Content Content__left'>
                <Logo url={LogoIMG} className={style.Logo} />
                <h2>ПРИСОЕДИНЯЙСЯ К ОГРОМНОМУ СООБЩЕСТВУ ГЕЙМЕРОВ, ДЕЛИСЬ, ОБСУЖДАЙ И НЕ ПЛАЧЬ В ПОДУШКУ.</h2>
                <h5>Маленькая компания состоящая из нескольких людей для создания сайтов ради ваших удобств.</h5>
            </div>
        )
    }
}
