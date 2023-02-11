import React, { Component, useContext, useState } from 'react'
import { Container, Offcanvas, NavDropdown } from 'react-bootstrap'
import CHPButton from '../UI/CHPButton'
import SideBTN from '../UI/SideBTN'
import Logo from '../UI/Logo'
import Title from '../UI/Title'
import LogoIMG from "../../assets/images/Logo3.png"
import style from "./Header.module.scss"
import { Link } from 'react-router-dom'
import { Context } from '../../main'
import { observer } from 'mobx-react-lite'


function Header() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { store } = useContext(Context)
    const Name = store.user.email
    if (store.isLoading) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    }


    return (
        <Container className='Header'>
            <div className='Header__Title'>
                <Link to="/home"><Logo url={LogoIMG} className={style.LogoIcon} /></Link>
                <Title>CHP</Title>
            </div>
            <div className='Header__Navbar'>

                <Link to="/home"><button className='Header__Navbar__NavBTN' > Home</button></Link>
                <Link to="/about"><button className='Header__Navbar__NavBTN' > About</button></Link>


                <button className='Header__Navbar__ProfBTN' onClick={handleShow} ><div className='ProfIMG' /></button>
                <Offcanvas show={show} onHide={handleClose} placement='end'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{Name}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}

                        <Link to='/profile/settings'><SideBTN value={"Profile settings"} type="button" /></Link>
                        <Link to='/authorization'><CHPButton className={style.LogOutBTN} value={"Log Out"} type="button" onClick={() => { store.logout() }} /></Link>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </Container >
    )
}

export default observer(Header);
{/* <CHPButton className={style.LogOutBTN} value={"Log Out"} type="button" onClick={() => { store.logout() }} /> */ }