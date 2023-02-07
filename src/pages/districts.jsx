import React, { Component } from 'react'
import { connect } from 'react-redux'
import DistrictModal from '../components/models/district-modal'
import { addDistrict, updateDistrict, getDistricts } from '../actions/area'
import DistrictTable from '../components/tables/district_table'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastAlert from '../components/ToastAlert';
import { withTranslation } from 'react-i18next';

class Districts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showmodal: false,
            editmode: false,
            editdata: {}
        }
    }

    getmainData = () => {
        this.props.dispatch(getDistricts());
    }

    componentDidMount() {
        if (this.props.allDistricts.length === 0) {
            this.getmainData()
        }
    }

    handleClose = () => this.setState({ showmodal: false });
    handleShow = () => {
        this.setState({ showmodal: true, editmode: false })

        // this.props.dispatch(addDistrict())   
    };


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



    addnewDistrict = (data) => {
        this.props.dispatch(addDistrict(data)).then((response) => {
            if (response.code === 200) {
                this.toastalert('success', response.message)

                setTimeout(() => {
                    this.getmainData()
                }, 2500)
            }
        }).catch((err) => {
            this.toastalert('error', err.message)
        })
    }

    editDistrict = (id) => {
        const item = this.props.allDistricts.find((item) => item._id === id);  // SELECT ONE ITEM FROM GROUP WHICH IS CLICKED FOR EDIT
        this.setState({ showmodal: true, editmode: true, editdata: item })
    }

    update_District = (data) => {
        this.props.dispatch(updateDistrict(data)).then((resp) => {
            if (resp.code === 200) {

                this.toastalert('success', resp.message)

                // setTimeout(() => {
                //     this.getmainData()   // LOAD ALL DISTRICTS AGAIN AS DATA IS UPDATED SUCCESSFULLY
                // }, 2500)

            }
        }).catch((err) => {
            this.toastalert('error', err.message)
        })

    }

    render() {
        const { t } = this.props;
        const { allDistricts, isLoading } = this.props;
        const { showmodal, editmode, editdata } = this.state;

        return (
            <div className='container-fluid'>
                <ToastAlert />
                <header>
                    <div className='d-flex justify-content-between '>
                        <span className='fs-5 px-2 font-primary'>{t('district')}</span>
                        {/* <button className='button title_btn py-0' onClick={this.handleShow}><i className='fa fa-plus'></i><span> Add District</span></button> */}
                    </div>
                </header>
                {isLoading &&
                    <div className="loading">Loading&#8230;</div>
                }

                <div className='py-0 sub-wrapper'>
                    <DistrictTable data={allDistricts} deleteDistrict={this.deleteDistrict} editDistrict={this.editDistrict} />
                    <DistrictModal editdata={editdata} editmode={editmode} show={showmodal} handleClose={this.handleClose} addnewDistrict={this.addnewDistrict} updateDistrict={this.update_District} />
                </div>



            </div>
        )
    }
}

function mapStateToProps(state) {
    const { allDistricts } = state.area;
    const { isLoading } = state.loading;

    return {
        isLoading,
        allDistricts
    };
}

const MyComponent = withTranslation()(connect(mapStateToProps)(Districts))
export default MyComponent
