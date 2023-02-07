import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function DistrictModal(props) {
    const [dname, setDname] = useState({en:'' , gu:''})
    const [dcode, setDcode] = useState('')
    const [dname_err, setDnameErr] = useState(false)
    const [dcode_err, setDcodeErr] = useState(false)

    const resetState = () =>{
        setDname(''); setDcode(''); setDnameErr(false);  setDcodeErr(false);
    }

    const handleClose = () => {
        resetState();
        props.handleClose();
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (dname?.en?.length === 0 || dname?.gu?.length === 0) {
            setDnameErr(true)
        }
        else {
            setDnameErr(false)
        }
        
        if (dname?.en?.length > 0 && dname?.gu?.length>0) {
        
            const payload = {
                district_name_eng: dname?.en,
                district_name_guj: dname?.gu
            }

            if (props.editmode) {
                payload.district_id = props.editdata._id;
                props.updateDistrict(payload)
            } else {
                props.addnewDistrict(payload)
            }
            handleClose();
        }
    }

    useEffect(() => {

        let district_name = props.editdata.district;

        if (props.editmode) {
            setDname({...dname,en:district_name.en ,gu:district_name.gu });
            setDcode(props.editdata._id);
        }
    }, [JSON.stringify(props.editdata.district), props.editdata._id])

    const setDistrictName = (lang,name)=>{
        setDname({...dname,[lang]:name });
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
                        {props.editmode ? 'Update District' :
                            'Add District'}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.editmode ?
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={dname?.en} placeholder="Enter district name" onChange={(e) => setDistrictName('en',e.target.value)} />

                                {dname_err &&
                                    <p className="text-danger">Please enter district name</p>
                                }
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" value={dname?.gu} placeholder="Enter district name" onChange={(e) => setDistrictName('gu',e.target.value)} />

                                {dname_err &&
                                    <p className="text-danger">Please enter district name</p>
                                }
                            </Form.Group>
                            


                            <button className='sbutton' type='submit' >
                                Update
                            </button>
                        </Form>
                        :

                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter district name" onChange={(e) => setDistrictName('en',e.target.value)} />
                                {dname_err &&
                                    <p className="text-danger">Please enter district name</p>
                                }
                            </Form.Group>

                            <button className='sbutton' type='submit' >
                                Submit
                            </button>
                        </Form>
                    }
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Submit</Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default DistrictModal;