import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CHPButton from '../../components/UI/CHPButton'
import LogoIMG from '../../assets/images/Logo3.png'
import Logo from '../../components/UI/Logo'
import Background from '../../components/Background'
import Title from '../../components/UI/Title'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import style from './HomePage.module.scss'
import './HomePage.module.scss'
import ComingSoonGameCard from '../../components/UI/ComingSoonGameCard'
function HomePage() {
    const { store } = useContext(Context)

    return (
        <div className='HomePage'>
            <Container className='d-flex align-items-center justify-content-center flex-column vh-100 HomePage__Block_1'>
                <Background url={"/src/assets/images/BGBlock_1.svg"} className={style.BGBlock}>
                    <div className='HomePage__Block_1__Fade'>
                        <div className='HomePage__Block_1__Content'>
                            <Logo url={LogoIMG} className={style.Logo} />
                            <Title className={style.Block_1_Title}>Добро пожаловать</Title>
                            <p>Добро пожаловать на наш форум, здесь вы можете обсуждать, делиться впечатлениями и просто хорошо провести время.</p>
                            <p>Здесь расположено 1000+ игр о которых и не знали существование и может даже заинтересует азывлазываываы</p>
                            <p>я задобался писать, Юля можешь сама дописать шо тут будет я всё выжат все равно психи кодеры будут сами придумают </p>
                            <p>Так что го рецепт лазаньи вставь idk.</p>
                        </div>
                    </div>
                </Background>
            </Container>
            <div className='HomePage__HDivider' />
            <div className='HomePage__HDivider'>
                <Title className={style.Block_2_Title}>COMING SOON</Title>
            </div>

            <Container className='d-flex align-items-center justify-content-center flex-column vh-100 HomePage__Block_2'>
                <Background url={"/src/assets/images/BGBlock_2.svg"} className={style.BGBlock}>
                    <div className='HomePage__Block_2__Fade'>
                        <div className='HomePage__Block_2__Content'>
                            <Container>
                                <Row className='HomePage__Block_2__Content_row'>
                                    {/*Для адаптивности можно все 6 карточек засунуть в 1 строку и править их марджины, их расположит автоматически*/}
                                    <ComingSoonGameCard url='/src/assets/images/CSGame.svg' />
                                    <ComingSoonGameCard url='/src/assets/images/CSGame.svg' />
                                    <ComingSoonGameCard url='/src/assets/images/CSGame.svg' />


                                </Row>
                                <Row className='HomePage__Block_2__Content_row'>
                                    <ComingSoonGameCard url='/src/assets/images/CSGame.svg' />
                                    <ComingSoonGameCard url='/src/assets/images/CSGame.svg' />
                                    <ComingSoonGameCard url='/src/assets/images/CSGame.svg' />

                                </Row>
                            </Container>
                        </div>
                    </div>
                </Background>
            </Container>
            <div className='HomePage__HDivider' />

        </div>
    )
}

export default observer(HomePage);
{/* <Background color='tomato' h='100vh' w='100%'>


                <Container className='d-flex align-items-center justify-content-center flex-column w-100 h-100'>



                    <Logo url={LogoIMG} className={style.Avatar} />
                    <Title>Добро пожаловать</Title>
                    <CHPButton value={"Log Out"} type="button" onClick={() => { store.logout() }} />

                </Container>
            </Background> */}