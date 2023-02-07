import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { updateSector, getSectors , createSector, getDistricts} from '../actions/area'
import SectorTable from '../components/tables/sector_table'
import SectorModal from '../components/models/sector-modal'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastAlert from '../components/ToastAlert';
import { withTranslation } from 'react-i18next';
import { getGhataks } from '../actions/projects'
class Sectors extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showmodal: false,
            editmode: false,
            editdata: {},
            sector: { en: '', gu: '' },
            sector_code: '',
            districtId: '',
            ghatakId: '',
            nameErr: false,
        }
    }

    componentDidMount() {
        if (this.props.allSectors.length === 0) {
            this.getmainData();
        }

    }

    getmainData = () => {
        this.props.dispatch(getSectors());   // API FOR LOADING ALL SECTORS
    }

    getAllDistricts = () => {
        this.props.dispatch(getDistricts());   // API FOR LOADING ALL SECTORS
    }

    getAllGhataks = () => {
        this.props.dispatch(getGhataks());   // API FOR LOADING ALL SECTORS
    }

    handleClose = () => this.setState({ showmodal: false });
    handleShow = () => {
        this.setState({ showmodal: true, editmode: false })

        if (this.props.allDistricts.length === 0) {
            this.getAllDistricts();
        }

        if (this.props.allghataks.length === 0) {
            this.getAllGhataks();
        }
    };

    editSector = (id) => {
        const item = this.props.allSectors.find((item) => item.id === id);    // SELECT ONE ITEM FROM GROUP WHICH IS CLICKED FOR EDIT
        this.setState({ showmodal: true, editmode: true, editdata: item, sector: { en: item.sector_name.en, gu: item.sector_name.gu } })
    }

    update_Sector = (data) => {
        this.props.dispatch(updateSector(data)).then((resp) => {
            if (resp.code === 200) {

                this.toastalert('success', resp.message)

                // setTimeout(()=>{
                //     this.getmainData()   // LOAD ALL Sectors AGAIN AS DATA IS UPDATED SUCCESSFULLY
                // },2500)

            }
        }).catch((err) => {
            this.toastalert('error', err.message)
        })
    }

    create_Sector = (data) => {
        this.props.dispatch(createSector(data)).then((resp) => {
            if (resp.code === 200) {
                this.toastalert('success', resp.message)
            }
        }).catch((err) => {
            this.toastalert('error', err.message)
        })
    }






    toastalert = (type, message) => {

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


    handleFormSubmit = (e) => {

        e.preventDefault()
        const { districtId, ghatakId, sector, editmode, editdata } = this.state;

        if (sector?.en?.length === 0 || sector?.gu?.length === 0) {
            this.setState({ nameErr: true })
        }
        else {
            this.setState({ nameErr: false })
        }

        if (sector?.en?.length > 0 && sector?.gu?.length > 0) {
            if (editmode) {

                const payload = {
                    sector_id: editdata["id"],
                    sector_name_eng: sector?.en,
                    sector_name_guj: sector?.gu
                }
                this.update_Sector(payload);
                this.handleClose();
            }
            else {
                if (districtId === '' || ghatakId === '') {
                    this.setState({ nameErr: true })
                    return
                }
                else {
                    this.setState({ nameErr: false })

                    const addpayload = {
                        district_id: districtId,
                        ghatak_id: ghatakId,
                        sector_name_eng: sector?.en,
                        sector_name_guj: sector?.gu
                    }
                    this.create_Sector(addpayload);
                    this.handleClose();
                }
            }

        }
    }

    setSectorName = (lang, name) => {
        let oldsector = this.state.sector;
        this.setState({ sector: {...oldsector, [lang]: name }})
    }

    handleClose = () => this.setState({ showmodal: false });  // CLOSES THE MODAL
    render() {
        const { t } = this.props;
        const { allSectors, isLoading, allDistricts, allghataks } = this.props;
        const { showmodal, editmode, editdata, sector, sector_code, districtId, ghatakId, nameErr } = this.state;

        return (
            <div className='container-fluid'>
                <ToastAlert />
                <header>
                    <div className='d-flex justify-content-between '>
                        <span className='fs-5 px-2 font-primary'>{t('sector')}</span>
                        {/* <button className='button dark_btn' onClick={this.handleShow}><i className='fa fa-plus'></i> Add Sector</button> */}
                    </div>
                </header>

                {isLoading &&
                    <div className="loading">Loading&#8230;</div>
                }
                <div className='py-0 sub-wrapper'>

                    <SectorTable data={allSectors} deleteSector={this.deleteSector} editSector={this.editSector} handleShow={this.handleShow} />
                    {/* <SectorModal editdata={editdata} editmode={editmode} show={showmodal} handleClose={this.handleClose} addnewSector={this.addnewSector} updateSector={this.updateSector}/> */}
                </div>


                <Modal
                    show={showmodal}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}

                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                        {editmode ?   "Update Sector" : "Create Sector" }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {editmode ?
                            <Form onSubmit={this.handleFormSubmit}>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Sector Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={sector?.en}
                                        placeholder="Enter sector name"
                                        onChange={(e) => this.setSectorName('en', e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control
                                        type="text"
                                        value={sector?.gu}
                                        placeholder="સેક્ટર નામ દાખલ કરો"
                                        onChange={(e) => this.setSectorName('gu', e.target.value)} />
                                </Form.Group>

                                {nameErr &&
                                    <p className="text-danger">Please fill out all fields.</p>
                                }

                                <button className='sbutton' type='submit' >
                                    Update
                                </button>
                            </Form>
                            :

                            <Form onSubmit={this.handleFormSubmit}>

                                <Form.Group className="mb-3" >
                                    <Form.Label>District</Form.Label>
                                    <Form.Select value={districtId} required onChange={(e) => {
                                        this.setState({ districtId: e.target.value })
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
                                    <Form.Label>Ghatak</Form.Label>
                                    <Form.Select value={ghatakId} required onChange={(e) => {
                                        this.setState({ ghatakId: e.target.value })

                                        // setDistrictName(e.target.options[e.target.selectedIndex].text)
                                    }
                                    }>
                                        <option value=''>Choose a Ghatak</option>
                                        {allghataks && allghataks.length > 0 && allghataks.map((item, index) =>
                                            <option value={item.id} key={index}>{item.ghatak_name?.en + " (" + item.ghatak_name?.gu + ")"} </option>
                                        )}
                                    </Form.Select>
                                </Form.Group>



                                <Form.Group className="mb-3" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter sector name" onChange={(e) => this.setSectorName('en', e.target.value)} />

                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="સેક્ટર નામ દાખલ કરો" onChange={(e) => this.setSectorName('gu', e.target.value)} />
                                    {nameErr &&
                                        <p className="text-danger">Please fill out all fields.</p>
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
}

function mapStateToProps(state) {
    const { allSectors, allDistricts } = state.area;
    const { isLoading } = state.loading;
    const { allghataks } = state.projects;

    return {
        isLoading,
        allSectors,
        allDistricts,
        allghataks
    };
}

const MyComponent = withTranslation()(connect(mapStateToProps)(Sectors))
export default MyComponent