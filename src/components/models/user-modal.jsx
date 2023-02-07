import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addUser, updataUser } from '../../actions/user';
// import FileBase64 from 'react-file-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function UserModal(props) {
    const [status, setStatus] = useState('')
    const [name, setNname] = useState({en:'',gu:''})
    const [email, setEmail] = useState('')
    const [validNum, setValidNum] = useState(null);
    const [numMessage, setNumMessage] = useState('')
    const [mobile, setMobile] = useState('')
    const [district, setDistrict] = useState('')
    const [districtName, setDistrictName] = useState('')

    // const [file, setFile] = useState(null)

    const handleClose = () => {
        resetState();
        props.handleClose();
    }

    const resetState = () => {
        setStatus('')
        setNname({})
        setEmail('')
        setValidNum(null)
        setNumMessage('')
        setMobile('')
        setDistrict('')
        setDistrictName('')
    }


    useEffect(() => {
        if (props.editmode) {
            const data = props.editdata;
            setNname( {en:data?.Name?.en , gu:data?.Name?.gu  })
            setEmail(data?.Email)
            setMobile(data?.Mobile)
            setStatus(data?.status)
            setDistrictName(data?.district_name)
        }
    }, [props.editmode])

    const handleFormSubmit = (e) => {



        e.preventDefault()
       

        if (props.editmode) {
            const editdata = {
                "user_id": props.editdata._id,
                "mobile": mobile,
                "eng_name":name.en,
                "guj_name":name.gu,
            }
            props.dispatch(updataUser(editdata)).then((response) => {
                if (response.code === 200) {

                    props.toastalert('success', 'User details updated successfully')

                }
            }).catch((err) => {

                props.toastalert('error', 'An Error occured while processing the request !')
            })
        } else {

            const payload = {
                // Name: name,
                // Email: email,
                // // image: file,
                // Mobile: mobile,
                // district_id: district,
                // district_name: districtName,

                "mobile": mobile,
                "eng_name": name.en,
                "guj_name": name.gu,
                "role": props?.role,
                "supervisor_name_eng": "",
                "supervisor_name_guj": '',
                "district_id": district,
                "linked_mobile": ''
            }

            console.log(payload,"line 95")
            return

            props.dispatch(addUser(payload)).then((response) => {
                if (response.code === 200) {

                    props.toastalert('success', 'CDPO added successfully')

                    // setTimeout(() => {
                    //     props.getmainData()
                    // }, 2500)
                }
            }).catch((err) => {

                props.toastalert('error', 'An Error occured while processing the request !')
            })
        }

        // props.dispatch(addDistrict(payload))

        handleClose();
    }


    // const getBase64 = file => {
    //     return new Promise(resolve => {
    //         // let fileInfo;
    //         let baseURL = "";
    //         // Make new FileReader
    //         let reader = new FileReader();

    //         // Convert the file to base64 text
    //         reader.readAsDataURL(file);

    //         // on reader load somthing...
    //         reader.onload = () => {
    //             // Make a fileInfo Object
    //             baseURL = reader.result;
    //             resolve(baseURL);
    //         };
    //     });
    // };


    const handleMobile = (e) => {
        var pattern = new RegExp(/^[0-9\b]+$/);
        const reg = /^[0]?[6789]\d{9}$/;
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                document.getElementById('mobileNumber').value = '';
                setMobile('');
                setValidNum(false);
            }
            else {
                if (reg.test(e.target.value)) {
                    setMobile(e.target.value);
                    setValidNum(true);
                } else {
                    setMobile(e.target.value);
                    setValidNum(false);
                    // setNumMessage("Please enter valid mobile number.")
                }
            }
        } else {
            setMobile('');
            setValidNum(true);
            setNumMessage("")
        }
    }

    const changeName = (lang , val)=>{
        // console.log(name , lang )
        setNname({...name , [lang]: val})

    }   

    // const handleFileInputChange = e => {
    //     let files = e.target.files[0];
    //     getBase64(files)
    //         .then(result => {
    //             files["base64"] = result;
    //             setFile(files)
    //         })
    //         .catch(err => {
    //         });
    //     setFile(e.target.files[0]);
    // };

    const { allDistricts, editmode } = props;
    return (
        <>


            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.editmode ? 'Update User' :
                            'Add New User'
                        }

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {props.userType === 'CDPO' && */}
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={name?.en} placeholder="Enter name" onChange={(e) => changeName('en' , e.target.value ) } />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Control required type="text" value={name?.gu} placeholder="નામ દાખલ કરો" onChange={(e) => changeName('gu' , e.target.value ) } />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email} placeholder="Enter name" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group> */}

                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" pattern="\d*" value={mobile} maxLength="10" id="mobileNumber" placeholder="" name="mobile" onChange={handleMobile} />
                            <p className='text-danger'>{numMessage}</p>
                            {/* <Form.Control required type="number" maxLength="10" placeholder="Enter mobile number" onChange={(e) => setDdescription(e.target.value)} /> */}
                        </Form.Group>

                        {/* <Form.Group className="mb-3" >
                                <Form.Label>Project</Form.Label>
                                <Form.Control required type="text" placeholder="Enter description" onChange={(e) => setDdescription(e.target.value)} />
                            </Form.Group> */}

                        {editmode ?
                              <></>
                            // <Form.Group className="mb-3" >
                            //     <Form.Label>District</Form.Label>
                            //     <Form.Control type="text" value={districtName} disabled />
                            // </Form.Group>
                            :
                            <Form.Group className="mb-3" >
                                <Form.Label>District</Form.Label>
                                <Form.Select value={district} aria-label="Default select example" onChange={(e) => {
                                    setDistrict(e.target.value)
                                    setDistrictName(e.target.options[e.target.selectedIndex].text)
                                }
                                }>
                                    <option value=''>Choose a District</option>
                                    {allDistricts && allDistricts.length > 0 && allDistricts.map((item, index) =>
                                        <option value={item._id} key={index}>{item.district?.en + " (" + item.district?.gu + ")"}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        }

                        {editmode ?
                            <button
                                className='sbutton'
                                variant="primary"
                                type='submit'
                            //   disabled={(validNum === true && name.length > 0) ? false : true}
                            >

                                Update
                            </button>

                            :
                            <button
                                className='sbutton'
                                variant="primary"
                                type='submit'
                                // disabled={(validNum === true && (name?.en.length > 0 && name?.gu.length > 0)) ? false : true}
                            >

                                Submit
                            </button>
                        }
                    </Form>
                    {/* } */}

                </Modal.Body>
              
            </Modal>




        </>
    );
}

export default UserModal;