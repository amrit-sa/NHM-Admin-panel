import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addVisit, deleteVisit, getAllVisits, getChecklist, getQuestions } from '../actions/survey'
import VisitTable from '../components/tables/visit_table'
import VisitModal from '../components/models/visit-modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Questions from '../components/tables/questions'
import SubVisit_table from '../components/tables/SubVisit_table'
import { withTranslation } from 'react-i18next';

class Visits extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showmodal: false,
            editmode: false,
            editdata: {},
            visitsData: [],
            showQuestionPage: false,
            questionData: [],
            showSubVisit: false,

            selectedChecklist:null
        }
    }

    componentDidMount() {
        if (this.props.visits.length === 0) {
            this.loadAllVisits();
        }
    }

    componentDidUpdate() {
        if (this.state.showSubVisit || this.state.showQuestionPage) {

            if (window.location.pathname === '/visits') {
                this.setState({
                    showSubVisit: false,
                    showQuestionPage: false,
                })
            }
        }
    }

    loadAllVisits = () => {
        this.props.dispatch(getAllVisits()).then((response) => {
            if (response.code === 200 && response.status === 'success') {
                // this.setState({ visitsData: response.getData })
            }
        })
    }

    handleClose = () => this.setState({ showmodal: false, editmode: false, editdata: {} });
    handleShow = () => {
        this.setState({ showmodal: true, editmode: false, editdata: {} })
    };

    // deleteVisit = (code) => {
    //     this.props.dispatch(deleteVisit(code))
    // }

    // addnewVisit = (data) => {
    //     this.props.dispatch(addVisit(data))
    // }


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

    editVisit = (visit) => {
        this.setState({ editmode: true, editdata: visit, showmodal: true })
    }


    // handleViewChecklist 
    handleViewQuestions = (val) => {
        this.props.dispatch(getQuestions(val)).then((response) => {
            if (response?.status === 'success') {
                this.setState({ questionData: response.visitQuestion })
            }
        })


        // this.props.navigate('/visits/checklists/1')
        this.setState({ showQuestionPage: true , selectedChecklist: val });
    }

    handleHideQuestions = () => {
        this.setState({ showQuestionPage: false });
    }

    setShowSubVisit = (val) => {

        this.setState({ showSubVisit: val })
    }



    render() {
        const { t } = this.props;
        const { visits, isLoading } = this.props;
        const { visitsData, showmodal, editdata, editmode, showQuestionPage, questionData, showSubVisit } = this.state;

        return (
            <div className='container-fluid'>

                {isLoading &&
                    <div className="loading">Loading&#8230;</div>
                }
                {/* <header>
                    <div className='d-flex justify-content-between '>
                        <span className='heading'>Type of Visits</span>
                        <button className='button title_btn' onClick={this.handleShow}><i className='fa fa-plus'></i> Add Visit</button>
                    </div>
                </header> */}

           
                {showQuestionPage ?
                    <>
                        <Questions
                            dispatch={this.props.dispatch}
                            questionData={questionData} 
                            handleHideQuestions={this.handleHideQuestions}
                            toastalert={this.toastalert}
                            selectedChecklist={this.state.selectedChecklist}
                        />
                    </>
                    :
                    showSubVisit ?

                        <SubVisit_table
                            dispatch={this.props.dispatch}
                            toastalert={this.toastalert}
                            handleViewQuestions={this.handleViewQuestions}
                            setShowSubVisit={this.setShowSubVisit}
                            title={'Visit Checklists'}
                        // selectedVisit={selectedVisit}
                        // setSubVisitData={setSubVisitData}
                        />

                        :
                        <VisitTable
                            // handleViewQuestions={this.handleViewQuestions}   not useful
                            handleShow={this.handleShow}
                            data={visits}
                            deleteVisit={this.deleteVisit}
                            editVisit={this.editVisit}
                            dispatch={this.props.dispatch}
                            toastalert={this.toastalert}

                            setShowSubVisit={this.setShowSubVisit}
                            title={t('visits')}
                        />


                }
                <VisitModal
                    show={showmodal}
                    toastalert={this.toastalert}
                    dispatch={this.props.dispatch}
                    editdata={editdata}
                    editmode={editmode}
                    handleClose={this.handleClose}
                    // addnewVisit={this.addnewVisit}
                    // updateVisit={this.updateVisit}
                    loadAllVisits={this.loadAllVisits}
                />


                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { visits } = state.survey;
    const { isLoading } = state.loading;

    return {
        visits,
        isLoading,
    };
}


const MyComponent = withTranslation()(connect(mapStateToProps)(Visits))
export default MyComponent
