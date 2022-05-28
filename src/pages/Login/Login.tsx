import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import "./Login.css"
import { ApiPost, ApiPut } from '../../helper/API/ApiData';
import Auth from '../../config/Auth';
import { useHistory } from 'react-router';

function Login() {

    const history = useHistory();
    const Errors = {
        emailFormat: '',
        emailError: '',
    }
    const passwordErrors = {
        newPassError: '',
        confirmPassError: '',
    }

    const [state, setState] = useState(Errors);
    const [passErrors, setPassErrors] = useState(passwordErrors);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");
    const [roleType, setRoleType] = useState<string>("");
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [showEmailSection, setShowEmailSection] = useState(true);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [showPassConfirmPassSection, setShowPassConfirmPassSection] = useState(false);

    const handleSubmit = () => {
        let Err = {
            emailFormat: '',
            emailError: '',
            passwordError: ''
        }
        let emailFormat = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

        if (!email) {
            Err.emailError = 'Please Enter your email address'
        }
        if (email && !emailFormat.test(email)) {
            Err.emailFormat = 'Please Enter valid email address'
        }
        setState(Err);
        if (!Err.emailError && !Err.emailFormat) {
            return true;
        }
        return false;
    }

    const checkPassword = () => {
        let flag = true

        const passError = {
            newPassError: '',
            confirmPassError: '',
        }

        if (newPassword === "") {
            passError.newPassError = "Enter Password"
            flag = false
        }
        if (confirmPassword === "") {
            passError.confirmPassError = "Enter Confirm Password"
            flag = false
        }
        if (newPassword !== confirmPassword) {
            passError.confirmPassError = "Enter password one more time"
            flag = false
        }
        setPassErrors(passError)
        return flag
    }


    const checkLogin = () => {
        if (!handleSubmit()) {
            return
        }
        ApiPost('admin/auth/checkLogin', {
            email: email
        }).then((res: any) => {
            setIsFirstTime(res.data.is_login_first)
            setRoleType(res.data.role_type)
            if (res.data.is_login_first === true) {
                setShowEmailSection(false)
                setShowPasswordSection(true)
            } else {
                setShowEmailSection(false)
                setShowPassConfirmPassSection(true)
            }
            // Auth.setAuthToken(res.data.token)
            // setIsDisabled(false)
            // history.push("/");
        }).catch((err: any) => {
            if (err) {
                setState({
                    ...state,
                    emailError: err
                });
            }
        })
    }

    const checkPass = () => {
        let flag = true
        if (password === "") {
            setPasswordErr("Enter Password")
            flag = false
        }
        return flag
    }

    const Login = () => {
        if (!checkPass()) {
            return
        }
        ApiPost('admin/auth/login', {
            email: email,
            password: password,
            role_type: roleType,
            is_login_first: isFirstTime
        }).then((res: any) => {
            Auth.setAuthToken(res.data.token)
            history.push("/home");
        }).catch((err: any) => {
            setPasswordErr(err)
            // if (err) {
            //     // setlimitError(err);
            // }
        })
    }

    const newLogin = () => {
        if (!checkPassword()) {
            return
        }
        ApiPut('admin/setPassword', {
            email: email,
            password: newPassword,
            role_type: roleType,
            is_login_first: isFirstTime
        }).then((res: any) => {
            console.log("res res res", res);
            Auth.setAuthToken(res.data.token)
            history.push("/");
        }).catch((err: any) => {
            // if (err) {
            //     // setlimitError(err);
            // }
        })
    }


    return (

        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={7}>
                    <div className="bg-white">
                        <div className="login-form">
                            <Form >
                                {showEmailSection &&
                                    <>
                                        <h1 className="font-weight-bold title-color  text-center">Admin Login</h1>
                                        <div className="mt-5">
                                            <input type="text" placeholder="Enter your email address" className="custom-input form-control" onChange={(e) => setEmail(e.target.value)} />
                                            {state.emailError && <p className="error mb-16" > {state.emailError} </p>}
                                            {state.emailFormat && <div className="error mb-16" > {state.emailFormat} </div>}
                                            <Button type="button" className="loginreg-btn" onClick={checkLogin}>Login</Button>

                                        </div>
                                    </>
                                }
                                {showPasswordSection &&
                                    <>
                                        <h1 className="font-weight-bold title-color  text-center">Enter Password</h1>
                                        <div className="mt-5">
                                            <input type="password" placeholder="Enter your password" className="custom-input form-control" onChange={(e) => setPassword(e.target.value)} />
                                            {passwordErr && <div className="error mb-16" > {passwordErr} </div>}
                                            <Button type="button" className="loginreg-btn" onClick={Login}>Login</Button>
                                        </div>
                                    </>
                                }
                                {showPassConfirmPassSection &&
                                    <>
                                        <h1 className="font-weight-bold title-color  text-center">Enter Password</h1>
                                        <div className="mt-5">
                                            <input type="password" placeholder="Enter your password" className="custom-input form-control" onChange={(e) => setNewPassword(e.target.value)} />
                                            {passErrors.newPassError && <p className="error mb-16" > {passErrors.newPassError} </p>}
                                            <input type="password" placeholder="Confirm password" className="custom-input form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
                                            {passErrors.confirmPassError && <p className="error mb-16" > {passErrors.confirmPassError} </p>}
                                            <Button type="button" className="loginreg-btn" onClick={newLogin}>Login</Button>
                                        </div>
                                    </>
                                }
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
