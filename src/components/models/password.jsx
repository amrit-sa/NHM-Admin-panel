import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import validator from 'validator'
import eye from '../../icons/basic/eye.png'
import blind from '../../icons/basic/blind.png'
import {resetPassword} from '../../actions/user'

function ManagePasswordModal(props) {
    const handleClose = () => props.handleClose();
    const [passwords, setPasswords] = useState({
        old: '',
        new: '',
        cnf: ''
    })
    const [submitError, setSubmitError] = useState('');
    const [newPassValid, setNewPassValid] = useState(false)
    const [cnfPassValid, setCnfPassValid] = useState(false)
    const [passError, setPassError] = useState('')
    const [isStrongPass, setIsStrongPass] = useState(true)

    const [passType, setPassType] = useState({
        old: 'password',
        new: 'password',
        cnf: 'password'
    })


    const formReset=()=>{
        setPasswords({old: '',new: '',cnf: ''});
        setSubmitError('');
        setNewPassValid(false);
        setCnfPassValid(false)
        setPassType({
            old: 'password',
            new: 'password',
            cnf: 'password'
        })
    }


    const toggleView = (type) => {
        if(type=='old'){
            setPassType({ ...passType, old: passType.old === 'password' ? 'text' : 'password' })
        }else if(type=='new'){
            setPassType({ ...passType, new: passType.new === 'password' ? 'text' : 'password' })
        } else if(type=='cnf'){
            setPassType({ ...passType, cnf: passType.cnf === 'password' ? 'text' : 'password' })
        }
    }

    const handleOldPassword = (e) => {
        const { value } = e.target;
        setPasswords({ ...passwords, old: value })
    }

    const handleNewPassword = (e) => {
        const { value } = e.target;
        setPasswords({ ...passwords, new: value })
        if (value.length >= 8) {
            if(!validatePassword(value)){
                setSubmitError("Enter a strong password including all  (Lowercase,Uppercase,Number,Symbol)")
            }else{
                setSubmitError("")
            }
            setNewPassValid(validatePassword(value))
        }
    }

    const handleCnfPassword = (e) => {
        const { value } = e.target;
        setPasswords({ ...passwords, cnf: value })

        if (value.length >= 8) {
            setCnfPassValid(validatePassword(value))
        }

    }

    const validatePassword = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setIsStrongPass(true)
            return true;
        } else {
            setIsStrongPass(false)
            return false;
        }
    }

    const handleSubmit = () => {
        passwords.old.length === 0 ? setSubmitError("Enter old password") :
            // (passwords.new.length < 8 || !newPassValid) ? setSubmitError("Enter a valid new password") :
            (passwords.new.length < 8 || !newPassValid) ? setSubmitError("Enter a strong password including all  (Lowercase,Uppercase,Number,Symbol)") :
                passwords.new !== passwords.cnf ? setSubmitError("Confirm password mismatch !") :
                    submitPassChange();
    }
    
    const submitPassChange = () => {
        setSubmitError('')

        const loginD = localStorage.getItem('userData');
        const adminData = JSON.parse(loginD);

        const payload = {
            user_id: adminData._id,
            email_id: adminData.email,
            old_password: passwords.old,
            new_password: passwords.new
        }

        props.dispatch(resetPassword(payload)).then((resp)=>{
            if(resp.code===200){
                props.toastalert('success',resp.message)
            }else{
                props.toastalert('error',resp.message)
            }
        })
        .finally(()=>{
            formReset();
            handleClose();
        })
    }

  


    return (
        <>


            <Modal
                show={props.modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPasswordold">
                            <Form.Label>Old Password</Form.Label>
                            <span className='d-flex align-items-center justify-content-around'>

                                <Form.Control className='w-90' type={passType.old} placeholder="********" maxLength={15} name="oldPswd" onChange={handleOldPassword} />
                                {passType.old === 'password' ?
                                    <img src={eye} width={30} onClick={() => toggleView('old')} id="hamburger" className=" hamburger cursor-point" />
                                    :
                                    <img src={blind} width={30} onClick={() => toggleView('old')} id="hamburger" className=" hamburger cursor-point" />
                                }
                            </span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswordnew">
                            <Form.Label>New Password</Form.Label>
                            <span className='d-flex align-items-center justify-content-around'>

                                <Form.Control className='w-90' type={passType.new} placeholder="********" maxLength={15} name="newPswd" onChange={handleNewPassword} />
                                {passType.new === 'password' ?
                                    <img src={eye} width={30} onClick={() => toggleView('new')} id="hamburger" className=" hamburger cursor-point" />
                                    :
                                    <img src={blind} width={30} onClick={() => toggleView('new')} id="hamburger" className=" hamburger cursor-point" />
                                }                            </span>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswordconfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <span className='d-flex align-items-center justify-content-around'>

                                <Form.Control type={passType.cnf} className='w-90'
                                    disabled={!newPassValid}
                                    placeholder="********" maxLength={15} name="cnfPswd" onChange={handleCnfPassword} />
                                {passType.cnf === 'password' ?
                                    <img src={eye} width={30} onClick={() => toggleView('cnf')} id="hamburger" className=" hamburger cursor-point" />
                                    :
                                    <img src={blind} width={30} onClick={() => toggleView('cnf')} id="hamburger" className=" hamburger cursor-point" />
                                }                              </span>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* {!isStrongPass &&
                        <>
                            <h6 className='text-danger'>Enter a strong password including all  (Lowercase,Uppercase,Number,Symbol)</h6>
                        </>
                    } */}
                    {submitError.length > 0 && <h6 className='text-danger'>{submitError}</h6>}
                    <button className='sbutton mx-2' variant="primary"
                        onClick={handleSubmit}
                    >Submit</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ManagePasswordModal;