import React from 'react'
import Header from '../../components/Header/Header'
import { Container } from 'react-bootstrap'
import CHPButton from '../../components/UI/CHPButton'
import LogoIMG from '../../assets/images/Logo3.png'
import Logo from '../../components/UI/Logo'
import style from './About.module.scss'
import Background from '../../components/Background'
import Title from '../../components/UI/Title'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
export default function About() {
    const { store } = useContext(Context)
    return (
        <div>
            <Background color='rgb(42, 42, 42)' h='100vh' w='100%'>


                <Container className='d-flex align-items-center justify-content-center flex-column w-100 h-100'>

                </Container>
            </Background >
        </div >
    )
}
