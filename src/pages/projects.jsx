import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { getProjects, updateProject } from '../actions/projects';
import ProjectTable from '../components/tables/project_table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastAlert from '../components/ToastAlert';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'


const Projects = (props) => {
    const { t } = useTranslation();

    const [showmodal, setShowModal] = useState(false);
    const [editdata, setEditdata] = useState({});
    const [project_name, setProject_name] = useState('');
    const [project_code, setProject_code] = useState('');



    useEffect(() => {
        if (props.allprojects.length === 0) {
            getmainData();
        }
    }, [])

    const getmainData = () => {
        props.dispatch(getProjects());
    }

    const handleClose = () => setShowModal(false);  // CLOSES THE MODAL

    const editProject = (id) => {
        const item = props.allprojects.find((item) => item._id === id);    // SELECT ONE ITEM FROM GROUP WHICH IS CLICKED FOR EDIT
        setShowModal(true);
        setEditdata(item);
        setProject_name(item.project_name);
        setProject_code(item.project_code);
    }


    const update_Project = (data) => {
        props.dispatch(updateProject(data)).then((resp) => {
            if (resp.code === 200) {

                toastalert('success', resp.message)

                // setTimeout(()=>{
                //     getmainData()   // LOAD ALL ProjectS AGAIN AS DATA IS UPDATED SUCCESSFULLY
                // },2500)

            }
        }).catch((err) => {
            toastalert('error', err.message)
        })
    }

    const handleFormSubmit = (e) => {

        e.preventDefault()
        const payload = {
            id: editdata["_id"],
            project_code: project_code,
            project_name: project_name
        }
        update_Project(payload);

        handleClose();
    }

    // handleProjectName = (e) => {
    //     let pr = this.state.editdata;
    //     pr.project_name = e.target.value;

    //     this.setState({ editdata: pr })
    // }


    const toastalert = (type, message) => {

        if (type === 'success') {

            toast.success(message, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        } else if (type === 'error') {
            toast.error(message, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
    }



    const { allprojects, isLoading } = props;

    return (
        <div className='container-fluid'>
            <ToastAlert />
            <header>
                    <div className='d-flex justify-content-between '>
                        <span className='fs-5 px-2 font-primary'>{t('project')}</span>
                    </div>
                </header>
            {isLoading &&
                <div className="loading">Loading&#8230;</div>
            }
            <div className='py-0 sub-wrapper'>

                <ProjectTable data={allprojects} editProject={editProject} />
            </div>
            {/* <ProjectModal 
                    editdata={editdata} 
                    editmode={editmode} 
                    show={showmodal} 
                    handleClose={this.handleClose} 
                    updateProject={this.updateProject} 
                    /> */}


            <Modal
                show={showmodal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>

                        <Form.Group className="mb-3" >
                                <Form.Label>Project Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={project_code}
                                    placeholder="Enter project code"
                                    onChange={(e) => setProject_code(e.target.value)} />
                            </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={project_name}
                                placeholder="Enter project name"
                                onChange={(e) => setProject_name(e.target.value)} />
                        </Form.Group>
                        <button className='sbutton' type='submit' >
                            Update
                        </button>
                    </Form>

                </Modal.Body>

            </Modal>


        </div>
    )

}

function mapStateToProps(state) {
    const { allprojects } = state.projects
    const { isLoading } = state.loading;

    return {
        isLoading,
        allprojects
    };
}



export default connect(mapStateToProps, null)(Projects)