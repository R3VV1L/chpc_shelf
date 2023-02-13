import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import CHPButton from '../../components/UI/CHPButton'
import './Main.module.scss'
import LogoIMG from '../../assets/images/Logo3.png'
import Logo from '../../components/UI/Logo'
import style from './Main.module.scss'
import Background from '../../components/Background'
import Title from '../../components/UI/Title'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import About from '../about/About';
import HomePage from '../home/HomePage'
import {
    Link,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'
import ProfileSettings from '../profile/ProfileSettings'
function MainForm() {
    const { store } = useContext(Context)


    return (
        <div>
            <Header />
            <Routes>
                <Route path="/authorization" element={<HomePage />}></Route>
                <Route path="/home" element={<HomePage />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/profile/settings" element={<ProfileSettings />}></Route>
            </Routes>
            <Footer />
        </div>
    )
}

export default observer(MainForm);