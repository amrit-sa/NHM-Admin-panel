import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addVisit, updateVisit } from '../../actions/survey';

function VisitModal(props) {
    const [visitName, setVisitName] = useState({ en: '', gu: '' })
    const [visitDesc, setVisitDesc] = useState({ en: '', gu: '' })
    const [role, setRole] = useState('');
    const [submiterr, setSubmitErr] = useState(false)
    const [visit_id, setVisitId] = useState(null)
    // const [file, setFile] = useState(null);
    const [filesizeError, setFileError] = useState('');

    useEffect(() => {
        if (props.editmode) {
            const data = props.editdata;
            setVisitName(data?.category_title)
            setVisitDesc(data?.save_visit_title)
            setRole(data?.role)
            // setFile(data?.path)
            setVisitId(data?._id)
        }
    }, [JSON.stringify(props.editdata)])

    const resetState = () => {
        setVisitName({ en: '', gu: '' })
        setVisitDesc({ en: '', gu: '' })
        setRole('')
        // setFile(null)
        setVisitId(null)
        setFileError('')
    }

    const handleClose = () => {
        resetState();     // Reset all state so input fields become fresh again
        props.handleClose();  // close the modal
    }

    const handleFormSubmit = (e) => {    // Submit the form
        e.preventDefault()

        // if (!props.editmode) {
        //     if (!file || filesizeError.length > 0) {
        //         return;
        //     }
        // }

        // let formData = new FormData();
        // formData.append('category_name', visitName);
        // formData.append('role', role);
        // formData.append('category_image', file);

        if (props.editmode) {    // UPDATE VISIT 

            if (visit_id.length===0 || visitName?.en.length === 0 || visitName?.gu.length === 0 || visitDesc?.en.length === 0 || visitDesc?.gu.length === 0) {
                setSubmitErr(true)
                return
            }
            setSubmitErr(false)


            const editpayload = {
                category_title: visitName,
                save_visit_title: visitDesc,
                category_id: visit_id
            }


            props.dispatch(updateVisit(editpayload)).then((response) => {
                if (response.status === 'success') {
                    props.toastalert('success', response.message)

                    setTimeout(() => {
                        props.loadAllVisits()
                    }, 2000)

                } else {
                    props.toastalert('error', response?.message ? response.message : "Error while processing this request.")
                }
            }).catch((error) => {
                props.toastalert('error', error.message)
            })
        } else {  // ADD NEW VISIT 

            if (role.length===0 || visitName?.en.length === 0 || visitName?.gu.length === 0 || visitDesc?.en.length === 0 || visitDesc?.gu.length === 0) {
                setSubmitErr(true)
                return
            }
            setSubmitErr(false)

            const addpayload = {
                category_title: visitName,
                save_visit_title: visitDesc,
                role: role
            }



            props.dispatch(addVisit(addpayload)).then((response) => {
                if (response.status === 'success') {
                    props.toastalert('success', response.message)

                    setTimeout(() => {
                        props.loadAllVisits()
                    }, 2000)

                } else {
                    props.toastalert('error', response?.message ? response.message : "Error while processing this request.")
                }
            }).catch((error) => {
                props.toastalert('error', error.message)
            })
        }
        handleClose();   // close the modal
    }


    // const getBase64 = file => {     // convert image to base 64
    //     return new Promise(resolve => {
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

    // const handleFileInputChange = e => {    // hnadle input type file on select image
    //     let files = e.target.files[0];
    //     if (parseInt(files.size / 1000) > 10) {
    //         setFileError("File size too large, Please select image of size less than 10KB")
    //     } else {
    //         setFileError('');
    //     }
    //     setFile(files);
    // };


    const set_visit_name = (lang, val) => {
        setVisitName({ ...visitName, [lang]: val })
    }
    const set_visit_desc = (lang, val) => {
        setVisitDesc({ ...visitDesc, [lang]: val })
    }

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
                        {props.editmode ? 'Update Visit' :
                            'Add new visit'}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {props.editmode ? */}
                    <Form onSubmit={handleFormSubmit}>
                        <div className="row">
                            <Form.Label>Visit Category Title</Form.Label>

                            <div className="col-6">
                                <Form.Group className="mb-3" >
                                    <Form.Control required type="text" value={visitName?.en} name="category_name" placeholder="Enter Visit name"
                                        onChange={(e) => set_visit_name('en', e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group className="mb-3" >
                                    <Form.Control required type="text" value={visitName?.gu} name="category_name" placeholder="મુલાકાતોના નામ દાખલ કરો"
                                        onChange={(e) => set_visit_name('gu', e.target.value)} />
                                </Form.Group>
                            </div>
                        </div>




                        <Form.Group className="mb-3" >
                            <Form.Label>Visit Category Description</Form.Label>
                            <Form.Control required type="text" value={visitDesc?.en} name="category_name" placeholder="Enter Visit Category Description"
                                onChange={(e) => set_visit_desc('en', e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control required type="text" value={visitDesc?.gu} name="category_name" placeholder="મુલાકાત શ્રેણી વર્ણન દાખલ કરો"
                                onChange={(e) => set_visit_desc('gu', e.target.value)} />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" >
                            <Form.Label className='mb-0'>Choose Image </Form.Label>
                            <div><small> (Allowed file type JPEG/JPG/PNG with maximum size 10KB )</small></div>
                            <Form.Control required={!props.editmode} type="file" accept="image/png, image/jpg, image/jpeg" name="category_image" onChange={handleFileInputChange} />
                            {filesizeError.length > 0 && <small className='text-danger mx-1'>{filesizeError}</small>}
                        </Form.Group> */}

                        <Form.Group className="mb-3" >
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="role" value={role} required onChange={(e) => setRole(e.target.value)}>
                                <option value=''>Choose role</option>
                                <option value='CDPO'>CDPO</option>
                                <option value='MS'>MS</option>
                                <option value='AWW'>AWW</option>
                            </Form.Select>
                        </Form.Group>


                        {submiterr &&
                            <p className="text-danger">Please fill out all fields to continue</p>
                        }

                        <button className='sbutton' variant="primary" type='submit' >
                            Submit
                        </button>
                    </Form>
                    {/* :

                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="text" name="category_name" placeholder="Enter Visit name" onChange={(e) => setVisitName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Choose Image </Form.Label><small> (Maximum Image size 10KB)</small>
                                <Form.Control required type="file" name="category_image" onChange={handleFileInputChange} />
                                {filesizeError.length > 0 && <small className='text-danger mx-1'>{filesizeError}</small>}
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Role</Form.Label>
                                <Form.Select name="role" required onChange={(e) => setRole(e.target.value)}>
                                    <option value=''>Choose role</option>
                                    <option value='CDPO'>CDPO</option>
                                    <option value='MS'>MS</option>
                                </Form.Select>
                            </Form.Group>

                            <button className='submit' variant="primary" type='submit' >

                                Submit
                            </button>
                        </Form>
                    } */}
                </Modal.Body>

            </Modal>
        </>
    );
}

export default VisitModal;