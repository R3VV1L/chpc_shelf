import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import CHPButton from '../../components/UI/CHPButton'
import LogoIMG from '../../assets/images/Logo3.png'
import Logo from '../../components/UI/Logo'
import style from '../main/Main.module.scss'
import Background from '../../components/Background'
import Title from '../../components/UI/Title'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
function HomePage() {
    const { store } = useContext(Context)

    return (
        <div>
            <Background color='tomato' h='100vh' w='100%'>


                <Container className='d-flex align-items-center justify-content-center flex-column w-100 h-100'>



                    <Logo url={LogoIMG} className={style.Avatar} />
                    <Title>Добро пожаловать</Title>
                    <CHPButton value={"Log Out"} type="button" onClick={() => { store.logout() }} />

                </Container>
            </Background>
        </div>
    )
}

export default observer(HomePage);