import React, { Component, useContext, useState } from 'react'
import { Container, Offcanvas } from 'react-bootstrap'


import { Link } from 'react-router-dom'
import { Context } from '../../main'
import { observer } from 'mobx-react-lite'


function Footer() {


    return (
        <Container className='Footer'>
            Чем заполнить футтер придумайте сами
        </Container >
    )
}

export default observer(Footer);