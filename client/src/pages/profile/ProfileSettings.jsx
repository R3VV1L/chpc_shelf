import { observer } from 'mobx-react-lite'
import React, { useState, useContext } from 'react'
import Background from '../../components/Background';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import CHPButton from '../../components/UI/CHPButton';
import CHPInput from '../../components/UI/CHPInput';
import { PasswordCheck, Check_passwordCheck } from '../registration/RegistrationLogic';
import { Context } from "../../main";
import MSG from '../../components/UI/MSG';

function ProfileSettings() {

    const [OldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [Check_NewPassword, setCheck_NewPassword] = useState("");

    const [OldPassword_Error_Type, setOldPassword_Error_Type] = useState("");
    const [NewPassword_Error_Type, setNewPassword_Error_Type] = useState("");
    const [Check_NewPassword_Error_Type, setCheck_NewPassword_Error_Type] = useState("");

    const [MSGtype, setMSGtype] = useState("error");

    const { store } = useContext(Context)
    const email = store.user.email
    async function PasswordChange() {
        setMSGtype("error")

        setOldPassword_Error_Type(PasswordCheck(OldPassword))
        setNewPassword_Error_Type(PasswordCheck(NewPassword))
        setCheck_NewPassword_Error_Type(Check_passwordCheck(NewPassword, Check_NewPassword))


        if (PasswordCheck(OldPassword) == "" && PasswordCheck(NewPassword) == "" && Check_passwordCheck(NewPassword, Check_NewPassword) == 0) {
            await store.ChangePassword(email, OldPassword, NewPassword)
            console.log((store?.errors?.response?.data?.message));
            if ((store?.errors?.response?.data?.message) == undefined) {
                setOldPassword_Error_Type("Password has been changed")
                setMSGtype('success')
            }
            if ((store?.errors?.response?.data?.message) != undefined) {
                setOldPassword_Error_Type(store?.errors?.response?.data?.message);
                setMSGtype('error')
            }

        }




    }

    async function Reset() {
        await store.ResetPassword(store.user.email)
        console.log(store?.errors?.response?.data?.message);
        setMSGtype('success')
        setOldPassword_Error_Type(store?.errors?.response?.data?.message)


    }


    return (
        <div>
            <Background color='rgb(42, 42, 42)' h='100%' w='100%'>
                <Container className='d-flex align-items-center justify-content-flex-start flex-column h-100 ProfileSettings'>
                    <Row className='ProfileSettings__Row_Avatar'>
                        <div className='ProfileSettings__Row_Avatar__AvatarIMG'></div>
                        <div className='ProfileSettings__Row_Avatar__AvatarSettings'></div>
                    </Row>
                    <Row className='ProfileSettings__Row'>
                        <label htmlFor="AboutMeTextarea" className="ProfileSettings__Row__Textarea_label">About me</label>
                        <textarea className="ProfileSettings__Row__AboutMeText" maxLength={300} id="AboutMeTextarea" placeholder="A few words about you"></textarea>
                    </Row>
                    <Row className='ProfileSettings__Row_password'>
                        Change password
                        <div className="ProfileSettings__Row_password__Input_group">
                            <MSG type={MSGtype}>{OldPassword_Error_Type}</MSG>

                            <CHPInput value={OldPassword} name="OldPassword" type='password' placeholder={"Current Password"} maxLength={32} onChange={(event) => setOldPassword(event.target.value)} />
                        </div>

                        <div className="ProfileSettings__Row_password__Input_group">
                            <MSG type={MSGtype}>{NewPassword_Error_Type}</MSG>
                            <CHPInput value={NewPassword} name="NewPassword" type='password' placeholder={"New Password"} maxLength={32} onChange={(event) => setNewPassword(event.target.value)} />
                        </div>

                        <div className="ProfileSettings__Row_password__Input_group">
                            <MSG type={MSGtype}>{Check_NewPassword_Error_Type}</MSG>
                            <CHPInput value={Check_NewPassword} name="Check_NewPassword" type='password' placeholder={"Repeat new password"} maxLength={32} onChange={(event) => setCheck_NewPassword(event.target.value)} />
                        </div>
                    </Row>
                    <Row className='ProfileSettings__Row_password_BTN'>
                        <CHPButton value={"Change password"} type="button" onClick={PasswordChange} />
                    </Row>

                    <CHPButton value={"Reset password"} type="button" onClick={Reset} />
                    <div>!Внимание,в случае сброса пароля Вам на почту будет отправлено письмо со ссылкой.</div>
                    <div>При переходе по ссылке в качестве нового пароля будет установлена ваша почта!</div>




                </Container>
            </Background >
        </div>
    )
}

export default observer(ProfileSettings);