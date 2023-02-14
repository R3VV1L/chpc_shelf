import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import style from './Registration.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import Background from '../../components/Background'
import bg from '../../assets/images/Background.png';
import ProjectInfo from '../../components/ProjectInfo';
import Divider from '../../components/UI/Divider';
import RegistrationForm from '../../components/RegistrationForm';
import AuthorizationForm from '../../components/AuthorizationForm';
import ResetForm from '../../components/ResetForm';
import MainForm from '../main/MainForm';
import About from '../about/About';
import { Context } from '../../main';
import {
    Link,
    Route,
    Routes
} from 'react-router-dom'
import { observer } from 'mobx-react-lite';


function Registration() {

    return (
        <Background color='black' h='100vh'>
            <Container fluid='sm' className='d-flex vh-100 align-items-center justify-content-center'>
                <Row className='d-flex w-100 align-items-center justify-content-center'>
                    <Col xxl={10}>
                        <Background url={bg} h='90vh' className={style.Form_wrapper} >
                            <ProjectInfo />
                            <Divider />
                            <Routes>
                                <Route path='/' element={<RegistrationForm />}></Route>
                                <Route path="/registration" element={<RegistrationForm />}></Route>
                                <Route path="/authorization" element={<AuthorizationForm />}></Route>
                                <Route path="/login-help" element={<ResetForm />}></Route>
                            </Routes>
                        </Background>
                    </Col>
                </Row>
            </Container>
        </Background>
    )
}


export default observer(Registration);
