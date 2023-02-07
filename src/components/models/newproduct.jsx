import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NewProduct(props) {
  const handleClose = () => props.handleClose();
  
  return (
    <>
   

      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Form for adding new project
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className='button mx-2' variant="primary">Submit</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewProduct;