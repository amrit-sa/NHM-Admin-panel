import logo from '../icons/app_logo.png'
import Form from 'react-bootstrap/Form';
import React, { Component } from 'react'
import { useNavigate } from "react-router-dom"
import appLogoGovt from '../icons/appLogoGovt.png'
import appLogoGovt1 from '../icons/appLogoGovt1.png'
import Poshan_Abhiyan_logo from '../icons/Poshan_Abhiyan_logo.jpg'


import validator from 'validator'

import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mobileNumber: '',
            pass: '',
            isStrongPass: true,
            email: '',
            isEmailvalid: false,
            remember: false,
            isValid: true,
            message: '',
            validPassword: true,
            userType: 'super-admin',
            submitError: ''
        }
    }

    // componentDidMount(){
    //     localStorage.removeItem('FHI_admin_mobile');
    //     sessionStorage.removeItem('FHI_admin_mobile');
    // }

    handleLogin = (e) => {

        e.preventDefault();
        const { mobileNumber, remember, email, isEmailvalid, pass } = this.state;

        if (!isEmailvalid) {
            return;
        }
        if (pass.length > 15) {
            this.setState({ validPassword: false })
            return;
        } else {
            this.setState({ validPassword: true })
        }
        // if (!this.validatePassword(pass)) {
        //     return;
        // }


        const payload = {
            email: email,
            password: pass
        }
        axios.post(API_URL + 'admin-panel-login', payload).then((response) => {
            const resp = response.data
            let adminData = resp.admindata;
            adminData['token'] = resp.token;
            localStorage.setItem('userData', JSON.stringify(adminData))
            // console.log('login', JSON.stringify(adminData)  )
            // localStorage.setItem('FHI_admin_id', resp.admindata._id);
            // sessionStorage.setItem('FHI_admin_role', resp.admindata.role);
            // sessionStorage.setItem('FHI_admin_name', resp.admindata.name);
            // sessionStorage.setItem('FHI_admin_token', resp.token);
            this.props.navigate("/");
        }).catch((err) => {
            // console.log('here err')
            this.setState({ submitError: err.response.data.message })
            // console.log(err.response.data.message)
        })

        // if (remember) {
        //     // save in local storage
        //     localStorage.setItem('FHI_admin_mobile', mobileNumber);
        //     sessionStorage.removeItem('FHI_admin_mobile');
        // } else {
        //     // save in session storage
        //     localStorage.removeItem('FHI_admin_mobile');
        //     sessionStorage.setItem('FHI_admin_mobile', mobileNumber);
        // }



    }

    // validatePassword = (value) => {

    //     if (validator.isStrongPassword(value, {
    //         minLength: 8, minLowercase: 1,
    //         minUppercase: 1, minNumbers: 1, minSymbols: 1
    //     })) {
    //         this.setState({ isStrongPass: true })
    //         return true;
    //     } else {
    //         this.setState({ isStrongPass: false })
    //         return false;
    //     }
    // }

    handleMobile = (e) => {
        var pattern = new RegExp(/^[0-9\b]+$/);
        const reg = /^[0]?[6789]\d{9}$/;
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                document.getElementById('mobileNumber').value = '';
                this.setState({ mobileNumber: '' });
                this.setState({ isValid: false });
                this.setState({ message: "Please enter only number." });
            }
            else {
                if (reg.test(e.target.value)) {
                    this.setState({ isValid: true, message: "", mobileNumber: e.target.value });
                } else {
                    this.setState({ isValid: false, message: "Please enter valid mobile number.", mobileNumber: e.target.value });
                }
            }
        } else {
            this.setState({ isValid: true, message: "", mobileNumber: '' });
        }
    }

    handlePassword = (e) => {
        this.setState({ pass: e.target.value });
        // if (e.target.value.length >= 8) {
        //     this.validatePassword(e.target.value)
        // }
        // if (e.target.value === '1234') {
        //     this.setState({ validPassword: true })
        // } else {
        //     this.setState({ validPassword: false })
        // }
    }


    handleEmail = (event) => {
        this.setState({ email: event.target.value });
        let str = event.target.value
        if (str && str.length > 2) {
            this.ValidateEmail(str)
        }
    }


    ValidateEmail(mail) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mail.match(mailformat)) {
            this.setState({ isEmailvalid: true })
        }
        else {
            this.setState({ isEmailvalid: false })
        }
    }



    handleRemember = (e) => {
        e.target.checked ? this.setState({ remember: true }) : this.setState({ remember: false });
    }

    handleUserTYpe = (e) => {
        this.setState({ userType: e.target.value })
    }




    render() {

        const { submitError, mobileNumber, pass, isValid, validPassword, email, isEmailvalid } = this.state;
        return (
            <div className="container-fluid">

                <div className='row login-wrapper'>
                    <div className='col-md-8 col-sm-12 left-section'>
                        <div className='left-logo-wrapper  d-flex justify-content-center align-items-center gap-5' style={{ flexDirection: 'column' }}>
                            <div className='d-flex icons-wrapper gap-2'>
                                <img src={appLogoGovt1} width={'120vw'} />
                                <img src={appLogoGovt} width={'120vw'} />
                                <img src={Poshan_Abhiyan_logo} width={'120vw'} />

                            </div>

                            <div className="main_logo_wrap" width={'15rem'} height={'15rem'}>
                                <img src={logo} alt='' />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-sm-12 wrapper login-right-wrapper">
                        <div className="title-text">
                            <div className="title login">Welcome to Login</div>
                            {/* <div className="title signup">Signup Form</div> */}
                        </div>
                        <div className="form-container">
                            {/* <div className="slide-controls">
                            <input type="radio" name="userType" id="super-admin" value="super-admin" defaultChecked=""
                                    onChange={this.handleUserTYpe}
                                />
                            <input type="radio" name="userType" id="admin" value="admin"
                            onChange={this.handleUserTYpe}
                            />
                            <label htmlFor="super-admin" className="slide super-admin">
                                Super Admin
                            </label>
                            <label htmlFor="admin" className="slide admin">
                                Admin
                            </label>
                            <div className="slider-tab" />
                        </div> */}
                            <div className="form-inner">
                                <form action="#" className="login" onSubmit={this.handleLogin}>
                                    <div className="field">
                                        <label>Email</label>
                                        <input type="email" value={email} placeholder="Enter Email id " onChange={this.handleEmail} />

                                        {email.length > 2 && !isEmailvalid &&
                                            <h6 className='text-danger'>Invalid Email Id</h6>
                                        }
                                        {/* <input type="text" pattern="\d*" maxLength="10" id="mobileNumber" placeholder="+91-987-654-3210" name="mobile" onChange={this.handleMobile} /> */}
                                    </div>
                                    <div className="field">
                                        <label>Password</label>
                                        <input type="password" placeholder="********" maxLength={15} name="password" onChange={this.handlePassword} />



                                    </div>

                                    {
                                        submitError.length > 0 ?
                                            <div className='alert alert-danger'>
                                                <h6 className=''>{submitError}</h6>
                                            </div>
                                            :
                                            !validPassword &&
                                            <div className='alert alert-danger'>
                                                <h6 className=''>Enter a valid password of length between 8 to 15 character.</h6>
                                            </div>
                                    }



                                    <div className="field mt-3">
                                        <button
                                            // className="submit-btn"
                                            className="submit-btn btn btn-block"
                                            // disabled={email.length > 2 && isEmailvalid && pass.length >= 8 ? false : true}
                                        >Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        )
    }
}



export default Login