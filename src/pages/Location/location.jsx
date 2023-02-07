import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { getGhataks, updateGhatak, createGhatak } from '../../actions/projects';
import GhatakTable from '../../components/tables/ghatak_table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastAlert from '../../components/ToastAlert';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { getDistricts } from '../../actions/area';
import LocationTable from '../../components/tables/location_table';
import './location.css'

const Location = (props) => {
    const { t } = useTranslation();

    const [showmodal, setShowModal] = useState(false);
    const [editdata, setEditdata] = useState({});
    const [editmode, setEditMode] = useState(false);
    const [ghatak_name, setGhatak_name] = useState({ en: '', gu: '' });
    const [ghatak_code, setGhatak_code] = useState('');
    const [nameErr, setNameErr] = useState(false)
    const [districtId, setDistrict] = useState('')


    // new for location page
    const [location, setLocation] = useState({
        District: true,
        Block: false,
        PHC: false,
        Ward: false,
        Village: false,
        Area: false
    })

    useEffect(() => {
        if (props.allghataks.length === 0) {
            getmainData();
        }
    }, [])

    const getmainData = () => {
        props.dispatch(getGhataks());
    }

    const handleClose = () => setShowModal(false);  // CLOSES THE MODAL

    const editGhatak = (id) => {
        const item = props.allghataks.find((item) => item.id === id);    // SELECT ONE ITEM FROM GROUP WHICH IS CLICKED FOR EDIT
        setShowModal(true);
        setEditdata(item);
        setEditMode(true);
        setGhatak_name({ en: item.ghatak_name.en, gu: item.ghatak_name.gu });
        // setGhatak_code(item.ghatak_code);
    }


    const update_Ghatak = (data) => {
        props.dispatch(updateGhatak(data)).then((resp) => {
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

    const create_Ghatak = (data) => {
        props.dispatch(createGhatak(data)).then((resp) => {
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

        if (ghatak_name?.en?.length === 0 || ghatak_name?.gu?.length === 0) {
            setNameErr(true)
        }
        else {
            setNameErr(false)
        }

        if (ghatak_name?.en?.length > 0 && ghatak_name?.gu?.length > 0) {
            if (editmode) {

                const payload = {
                    ghatak_id: editdata["id"],
                    ghatak_name_eng: ghatak_name?.en,
                    ghatak_name_guj: ghatak_name?.gu
                }
                update_Ghatak(payload);
            }
            else {
                const addpayload = {
                    district_id: districtId,
                    ghatak_name_eng: ghatak_name?.en,
                    ghatak_name_guj: ghatak_name?.gu
                }
                create_Ghatak(addpayload);
            }
            handleClose();
        }
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

    const handleShow = () => {
        setShowModal(true);
        setEditMode(false)

        if (props.allDistricts.length === 0) {
            props.dispatch(getDistricts());
        }

    };

    const setGhatakName = (lang, name) => {
        setGhatak_name({ ...ghatak_name, [lang]: name });
    }

    const { allghataks, isLoading, allDistricts } = props;

    const handleLocationSelect = (type, serial) => {
        // setLocation({ ...location, [type]: !location[type] })

        if (!location[type] == false && (type != 'Area')) {

            switch (type) {
                case 'District':
                    setLocation({ ...location, Block: false, PHC: false, Ward: false, Village: false, Area: false, })
                    return

                case 'Block':
                    setLocation({ ...location, PHC: false, Ward: false, Village: false, Area: false, })
                    return

                case 'PHC':
                    setLocation({ ...location, Ward: false, Village: false, Area: false, })
                    return

                case 'Ward':
                    setLocation({ ...location, Village: false, Area: false, })
                    return

                case 'Village':
                    setLocation({ ...location, Area: false, })
                    return

                default:
                    return
            }
        }

        if (!location[type] == true) {

            switch (type) {

                case 'Block':
                    setLocation({ ...location, Block: true })
                    return

                case 'PHC':
                    setLocation({ ...location, Block: true, PHC: true })
                    return

                case 'Ward':
                    setLocation({ ...location, Block: true, PHC: true, Ward: true })
                    return

                case 'Village':
                    setLocation({ ...location, Block: true, PHC: true, Ward: true, Village: true })
                    return

                case 'Area':
                    setLocation({ ...location, Block: true, PHC: true, Ward: true, Village: true, Area: true })
                    return

                default:
                    return
            }
        }

    }

    const LocLabels = ['District', 'Block', 'PHC', 'Ward', 'Village', 'Area']

    return (
        <div className='container-fluid'>
            <ToastAlert />
            <header>
                <div className='d-flex justify-content-between '>
                    <span className='fs-5 px-2 font-primary'>
                        {/* {t('ghatak')} */}
                        Location
                    </span>
                    {/* <button className='button title_btn py-0' onClick={handleShow}><i className='fa fa-plus'></i><span> Add Ghatak</span></button> */}

                </div>
            </header>

            <div className='d-flex gap-3 mb-3 px-4'>

                {LocLabels?.map((label , i) => {
                    return (
                        <>
                            <div key={i} className={`big-arrow-wrapper ${location[label] ? 'loc-item-active' : 'loc-item-inactive'}  `}
                                onClick={() => handleLocationSelect(label, 1)}
                            >
                                <div>
                                    <div className="parallelogram "></div>
                                    <div className="parallelogram2 "></div>
                                </div>
                                <div className='loc-label'>{label}</div>
                            </div>
                        </>
                    )
                })}

                
            </div>

            {isLoading &&
                <div className="loading">Loading&#8230;</div>
            }




            <div className='py-0 sub-wrapper'>
                <LocationTable data={allghataks} editGhatak={editGhatak} handleShow={handleShow} locationAvailable={location} />
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
                        {editmode ? "Update Ghatak" : "Create Ghatak"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {editmode ?
                        <Form onSubmit={handleFormSubmit}>

                            {/* <Form.Group className="mb-3" >
                                <Form.Label>Ghatak Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={ghatak_code}
                                    placeholder="Enter ghatak code"
                                    onChange={(e) => setGhatak_code(e.target.value)} />
                            </Form.Group> */}

                            <Form.Group className="mb-3" >
                                <Form.Label>Ghatak Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={ghatak_name?.en}
                                    placeholder="Enter ghatak name"
                                    onChange={(e) => setGhatakName('en', e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control
                                    type="text"
                                    value={ghatak_name?.gu}
                                    placeholder="ઘટકનું નામ દાખલ કરો"
                                    onChange={(e) => setGhatakName('gu', e.target.value)} />
                            </Form.Group>
                            <button className='sbutton' type='submit' >
                                Update
                            </button>
                        </Form>
                        :
                        <Form onSubmit={handleFormSubmit}>

                            <Form.Group className="mb-3" >
                                <Form.Label>District</Form.Label>
                                <Form.Select value={districtId} onChange={(e) => {
                                    setDistrict(e.target.value)
                                    // setDistrictName(e.target.options[e.target.selectedIndex].text)
                                }
                                }>
                                    <option value=''>Choose a District</option>
                                    {allDistricts && allDistricts.length > 0 && allDistricts.map((item, index) =>
                                        <option value={item._id} key={index}>{item.district?.en + " (" + item.district?.gu + ")"} </option>
                                    )}
                                </Form.Select>
                            </Form.Group>



                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter ghatal name" onChange={(e) => setGhatakName('en', e.target.value)} />

                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder="ઘટકનું નામ દાખલ કરો" onChange={(e) => setGhatakName('gu', e.target.value)} />
                                {nameErr &&
                                    <p className="text-danger">Please enter ghatak name</p>
                                }
                            </Form.Group>

                            <button className='sbutton' type='submit' >
                                Submit
                            </button>
                        </Form>

                    }

                </Modal.Body>

            </Modal>


        </div>
    )

}

function mapStateToProps(state) {
    const { allghataks } = state.projects
    const { isLoading } = state.loading;
    const { allDistricts } = state.area;

    return {
        isLoading,
        allghataks,
        allDistricts
    };
}



export default connect(mapStateToProps, null)(Location)