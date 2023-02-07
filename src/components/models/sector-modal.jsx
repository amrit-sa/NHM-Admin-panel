import React, { useState  , useEffect} from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function SectorModal(props) {
    const [dname, setSname] = useState('')
    const [dcode, setScode] = useState('')

    const handleClose = () => props.handleClose();

    const handleFormSubmit = (e) => {

        e.preventDefault()
        const payload = {
            sector : dname,
            // code: dcode
        }
        if (props.editmode) {
            payload._id = dcode;
            props.updateSector(payload)
        } else {
            props.addnewSector(payload)
        }
        handleClose();
    }
    
    useEffect(()=>{
        if(props.editmode ){
            setSname(props.editdata.sector);
            setScode(props.editdata._id);
        }
    },[props.editdata.sector, props.editdata._id])


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
                        {props.editmode ? 'Update Sector' :
                            'Add Sector'}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {props.editmode ? */}
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={dname} placeholder="Enter sector name" onChange={(e) => setSname(e.target.value)} />
                            </Form.Group>

                            {/* <Form.Group className="mb-3" >
                                <Form.Label>Code</Form.Label>
                                <Form.Control type="text" value={dcode} placeholder="Enter sector code" onChange={(e) => setScode(e.target.value)} />
                            </Form.Group> */}

                            <button className='sbutton' type='submit' >
                                Update
                            </button>
                        </Form>
                        {/* : 
                         <Form onSubmit={handleFormSubmit}>
                             <Form.Group className="mb-3" >
                                 <Form.Label>Name</Form.Label>
                                 <Form.Control type="text" placeholder="Enter sector name" onChange={(e) => setSname(e.target.value)} />
                             </Form.Group>

                             <Form.Group className="mb-3" >
                                 <Form.Label>Code</Form.Label>
                                 <Form.Control type="text" placeholder="Enter sector code" onChange={(e) => setScode(e.target.value)} />
                             </Form.Group>

                             <button className='button mx-2'  type='submit' >
                               
                                     Submit
                             </button>
                         </Form>
                    } */}
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

export default SectorModal;