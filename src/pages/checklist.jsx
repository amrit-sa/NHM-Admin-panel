import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { addChecklist, deleteChecklist } from '../actions/survey'
import { useNavigate, useParams } from "react-router-dom"
import DataTable from 'react-data-table-component';

export class Checklist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalshow: false,
            extraoptions: 0,
            viewCheckModalShow: false,
            selected_visit: {},

            ques_title: '',
            ques_type: '',
            options: []
        }


    }

    handleShow = () => {
        this.setState({ modalshow: true })
    }

    handleClose = () => this.setState({ modalshow: false })

    viewChecklist = (obj) => {
        // const { checklists } = this.props;
        // const ques_title = checklists.find((ques) => ques.id === ques_id);
        this.setState({
            ques_title: obj.question,
            ques_type: obj.option_type,
            options: obj.options,
            viewCheckModalShow: true
        })
    }

    viewCheckModalClose = () => {
        this.setState({ viewCheckModalShow: false })
    }


    render() {
        const { checklists, checklistData, selected_visit_category, selected_visit } = this.props;
        const { ques_type, options } = this.state

        return (
            <>
                <div className='container-fluid'>
                    <header>
                        {/* <div className="row">
                            <h5>{selected_visit && selected_visit.title}</h5>
                        </div> */}
                        <div className='d-flex justify-content-between '>
                            <div className="d-flex align-items-center justify-content-between">
                                <i className="fa fa-arrow-circle-left back_btn"
                                    onClick={this.props.handleHideChecklist}></i>

                                <span className='heading fs-6 font-primary px-4'>
                                    <span>{selected_visit?.category_title?.hi}</span> <span>{'>'}</span> <span>{selected_visit_category?.sub_category_title}</span>
                                    {/* <Form.Select aria-label="Default select example" onChange={(e) => this.changeSection(e.target.value)}>
                                    {selected_visit && selected_visit.sections && selected_visit.sections.length > 0 && selected_visit.sections.map((sec, i) =>
                                        <option value="bmj" key={i}>{sec.title}</option>
                                        )}
                                    </Form.Select> */}
                                </span>
                            </div>
                            <button className='button mx-2' onClick={this.handleShow}><i className='fa fa-plus'> </i> Add </button>
                        </div>
                    </header>

                </div>

                <ChecklistTable
                    checklistData={checklistData}
                    viewChecklist={this.viewChecklist}
                />


                <Modal
                    show={this.state.modalshow}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Create Checklist
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            onSubmit={this.handleFormSubmit}
                        >
                            <Form.Group className="mb-3" >
                                <Form.Label>Question</Form.Label>
                                <Form.Control type="text" placeholder="Enter question" onChange={(e) => this.setState({ ques_title: e.target.value })} />
                            </Form.Group>


                            <Form.Group className="mb-3" >
                                <Form.Label>Answer type</Form.Label>
                                <Form.Select aria-label="Default select example" value={ques_type} onChange={(e) => this.changeAnsType(e.target.value)}>
                                    <option value={"option"}>Choose an options</option>
                                    <option value={"answer"}>Write down answer</option>
                                    <option value={"multiple"}>Multiple choice</option>
                                </Form.Select>

                            </Form.Group>

                            {["option", "multiple"].includes(ques_type) &&
                                <>
                                    <div className='d-flex justify-content-between  gap-2 mb-3 ' >
                                        <Form.Control className="w-50" id={options[0].id} value={options[0].value} type="text" placeholder="Option 1" onChange={this.handleOption} />
                                        <Form.Control className="w-50" id={options[1].id} value={options[1].value} type="text" placeholder="Option 2" onChange={this.handleOption} />
                                        <Button onClick={this.addOption} className='button '><i className='fa fa-plus'></i></Button>

                                    </div>

                                    <div className='d-flex  flex-wrap mb-3 ' >
                                        {options.length > 2 && options.slice(2).map((item, i) => {
                                            return (

                                                <div className="d-flex mb-3" key={i}>
                                                    <Form.Control id={item.id} value={item.value} type="text" placeholder="New Option" onChange={this.handleOption} />
                                                    <i className='fa fa-trash option-delete-btn text-danger' onClick={() => this.removeOption(item.id)}></i>
                                                </div>

                                            )
                                        })}
                                    </div>

                                </>
                            }

                            <button className='sbutton' type='submit' >

                                Submit
                            </button>
                        </Form>

                    </Modal.Body>
                    {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Submit</Button>
                </Modal.Footer> */}
                </Modal>



                <Modal
                    show={this.state.viewCheckModalShow}
                    onHide={this.viewCheckModalClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        {/* <Modal.Title>
                            View Checklist
                        </Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Question: {this.state.ques_title}</h5>
                        <hr></hr>
                        <h5>Options</h5>
                        {this.state.options.map((op, i) =>
                            <div>{op.name}</div>
                        )}

                        {this.state.ques_type === 'CheckBox' ?
                            <>
                                {/* {this.state.options.map((op, i) =>
                                    <Form.Group className="mb-3" key={i}>
                                        <input type="checkbox" disabled className='mx-3' name="opt_1" />
                                        <Form.Label> {op.name}</Form.Label>
                                    </Form.Group>
                                )} */}
                            </>
                            :
                            this.state.ques_type === 'multiple' ?
                                <>
                                    {/* {this.state.ques_title.options.map((op, i) =>
                                        <Form.Group className="mb-3" >
                                            <input type="checkbox" className='mx-3' name="opt_1" />
                                            <Form.Label> {op.value}</Form.Label>
                                        </Form.Group>
                                    )} */}
                                </>
                                :
                                this.state.ques_type === 'answer' ?
                                    <></>
                                    :
                                    <></>
                        }
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}


function mapStateToProps(state) {
    const { checklists, visits, selected_visit, selected_visit_category } = state.survey;

    return {
        visits,
        checklists,
        selected_visit,
        selected_visit_category
    };
}


export default  connect(mapStateToProps, null)(Checklist)


//////////////////////////////////////////////////





const ChecklistTable = ({ checklistData, viewChecklist }) => {

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width:'80px'
        },
        {
            name: "Title",
            selector: row => row?.question && row.question,
        },
        {
            name: "Action",
            width:"200px",            
            cell: (row, index) => <>

                <div className='d-flex justify-content-center'>

                    <button className='button mx-2'
                    ><i className='fa fa-edit'></i></button>
                    <button className='button mx-2'
                    // onClick={() => this.deleteItem(item.id)}
                    ><i className='text-danger fa fa-trash'></i></button>
                    <button className='button mx-2'
                        onClick={() => viewChecklist(row)}
                    ><i className='fa fa-eye'></i></button>
                </div>
            </>
        }
    ]


    return (
        <DataTable
            columns={columns}
            data={checklistData}
            noHeader
            // pagination
            fixedHeader
            fixedHeaderScrollHeight='30rem'
            highlightOnHover
        />
    )
}

export { ChecklistTable }