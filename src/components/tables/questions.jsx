import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { getOptionsofQuestion, deleteChecklist, addQuesCat, editQuesTitle } from '../../actions/survey'
import { useNavigate, useParams } from "react-router-dom"
import DataTable from 'react-data-table-component';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';


class Questions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalshow: false,

            question_label: '',
            question_title: '',
            current_question: "",
            option_type: 'YesNo',
            current_options: [{ id: parseInt(Math.random() * 100000), name: "" }, { id: parseInt(Math.random() * 100000), name: "" }],

            editMode: false,


            extraoptions: 0,
            selected_visit: {},

            viewQuesModalShow: false,
            ques_title: '',
            ques_type: '',
            options: [],


            questionCatLabel: '',
            questionCatTitle: '',

            // used for final question table 
            final_questionData: [],

            editQuesTitleMode: false,

            questionListData: null,
        }


    }

    handleShow = () => {
        this.setState({ modalshow: true })
    }

    handleClose = () => {
        this.setState({
            modalshow: false,
            question_label: '',
            question_title: '',
            current_question: "",
            option_type: '',
            current_options: [{ id: parseInt(Math.random() * 100000), name: "" }, { id: parseInt(Math.random() * 100000), name: "" }],
            editQuesTitleMode: false
        })
    }

    handleQuesCatClick = (obj) => {
        // const { checklists } = this.props;
        // const ques_title = checklists.find((ques) => ques.id === ques_id);

        // const { dispatch } = this.props;
        // const { category_id, sub_category_id, question_category_id, question_label, question_category_title } = obj;

        // // console.log(obj,selected_visit_category, selected_visit,'obj');

        // let payload = {
        //     category_id: category_id,
        //     sub_category_id: sub_category_id,
        //     question_category_id: question_category_id
        // }

        // this.setState({ questionCatLabel: question_label, questionCatTitle: question_category_title, quesCatData: obj })

        // NEW
        console.log(obj, '????')
        this.setState({ questionListData: obj })

        //OLD
        // dispatch(getOptionsofQuestion(payload)).then((resp) => {
        //     this.setState({ final_questionData: resp.visitQuestionDetails });
        // })


        // this.setState({
        //     ques_title: obj.question,
        //     ques_type: obj.option_type,
        //     options: obj.options,
        //     viewQuesModalShow: true
        // })
    }

    handleEditQuesTitleSubmit = (e) => {
        e.preventDefault();
        const { selected_visit, selected_visit_category, dispatch, toastalert } = this.props;
        const { question_title, question_label, quesCatData } = this.state;

        let payload = {
            category_id: selected_visit._id,
            sub_category_id: selected_visit_category.sub_category_id,
            question_document_id: quesCatData.question_category_id,
            question_category_title: question_title
        }

        dispatch(editQuesTitle(payload)).then((response) => {
            if (response.code === 200 && response.status === 'success') {
                toastalert('success', 'Question category updated successfully')
            } else {
                toastalert('error', 'Error while processing this request!')
            }
        })

        this.handleClose();

    }



    handleQuesFormSubmit = (e) => {
        e.preventDefault();
        const { selected_visit, selected_visit_category, dispatch, toastalert } = this.props;
        const { question_title, question_label, current_question, option_type, current_options } = this.state;




        const values_optionArr = current_options.map((a) => a.name);
        const final_opt_arr = values_optionArr.filter((opt) => opt.length > 0);
        if (!selected_visit._id || !selected_visit_category.sub_category_id || question_title.length === 0 || question_label.length === 0 || current_question.length === 0 || final_opt_arr.length === 0) {
            return;
        }

        let payload = {
            category_id: selected_visit._id,
            sub_category_id: selected_visit_category.sub_category_id,

            question_title: question_title,
            question_label: question_label,
            child_category_question: current_question,
            child_category_option: final_opt_arr,
            child_category_answer: "",
            child_category_visitType: "",
            child_category_optionType: option_type,
            child_category_pointsOfObservation: "",
            child_category_summary: "",
            child_category_problem: [""],
            child_category_action: "",
            child_category_status: true,
            child_category_isVisible: "",
            child_category_filter: "",
            child_category_questionType: "multi",
            is_visible: ""
        }

        dispatch(addQuesCat(payload)).then((response) => {
            if (response.code === 200 && response.status === 'success') {
                toastalert('success', 'Question category added successfully')
            } else {
                toastalert('error', 'Error while processing this request!')
            }
        })

        this.handleClose();

    }


    addOption = () => {
        const { current_options } = this.state;
        this.setState({ current_options: [...current_options, { id: parseInt(Math.random() * 100000), name: "" }] })
    }

    removeOption = (index) => {
        const { current_options } = this.state;
        this.setState({ current_options: current_options.filter((obj) => obj.id !== index) })
    }


    handleCurrentOption = (e) => {             // UPDATE OPTIONS 
        const { id, value } = e.target
        const { current_options } = this.state;
        let obj = current_options.map((item) => {
            if (Number(item.id) === Number(id)) {
                return { ...item, ["name"]: value }
            }
            else {
                return item
            }
        })
        this.setState({ current_options: obj });
    }

    handleEditQuesTitle = () => {    // OPEN MODAL FOR EDITING QUESTION CATEGORY TITLE AND LABEL
        const { quesCatData } = this.state;
        this.setState({
            editQuesTitleMode: true,
            modalshow: true,
            question_title: quesCatData.question_category_title,
            question_label: quesCatData.question_label,
        })

    }




    render() {
        const { checklists, questionData, selected_visit_category, selected_visit, selectedChecklist } = this.props;
        const { questionListData, editQuesTitleMode, question_label, question_title, current_question, editMode, current_options, option_type, ques_type, options, final_questionData, questionCatLabel, questionCatTitle } = this.state

        return (
            <>
                <div className='container-fluid'>
                    <header>
                        {/* <div className="row">
                            <h5>{selected_visit && selected_visit.title}</h5>
                        </div> */}
                        <div className='d-flex justify-content-between '>
                            <div className="d-flex align-items-center justify-content-between">
                                <i className="fa fa-arrow-circle-left back_btn fs-3"
                                    onClick={this.props.handleHideQuestions}></i>

                                <span className='heading fs-6 font-primary px-4'>
                                    <span>{selected_visit?.category_title?.en}</span> <span>{'>'}</span> <span>{selectedChecklist?.subcategory_title?.en}</span>
                                    {/* <Form.Select aria-label="Default select example" onChange={(e) => this.changeSection(e.target.value)}>
                                    {selected_visit && selected_visit.sections && selected_visit.sections.length > 0 && selected_visit.sections.map((sec, i) =>
                                        <option value="bmj" key={i}>{sec.title}</option>
                                        )}
                                    </Form.Select> */}
                                </span>
                            </div>
                        </div>
                    </header>
                    <div className='py-2 sub-wrapper'>
                        <div className='d-flex gap-3 flex-wrap mb-3'>
                            {questionData?.length > 0 && questionData.map((item, index) =>
                                <div key={index} className={`question-type_card  ${questionCatTitle === item?.Child_Category_Title?.en && 'selected'}`} onClick={() => this.handleQuesCatClick(item)}>
                                    <h6 className={`question-type-heading fw-bold mt-1 pb-1 mb-1 px-2 `}>{item?.Child_Category_Title?.en}</h6>
                                </div>
                            )
                            }

                            <div className={`question-type_card selected `}
                                onClick={this.handleShow}
                            // onClick={this.handleAddQuesCat}
                            disabled
                            >
                                <h6 className={`question-type-heading fw-bold mt-1 pb-1 mb-1 px-2 `}><i className='fa fa-plus'></i></h6>
                            </div>
                        </div>
                        {/* <hr></hr> */}





                        {questionListData && <div className='questionCat-label d-flex justify-content-between py-2 my-2 rounded-4'>
                            <span>
                                {questionListData?.Child_Category_Title?.en}: {questionListData?.Lebel?.en}
                            </span>
                            {/* <span>
                                <i className='fa fa-pencil cursor-point'
                                    onClick={this.handleEditQuesTitle}
                                ></i>
                            </span> */}
                        </div>}
                        <QuestionlistTable
                            // questionData={final_questionData}
                            questionData={questionListData}
                            viewQuestionDetails={this.viewQuestionDetails}
                        />
                    </div>

                </div>

                <Modal              //  ADD NEW QUESTION TITLE AND ONE QUESTION
                    show={this.state.modalshow}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editQuesTitleMode ? 'Update title' : 'Add new question'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form

                        >


                            <Form.Group className="mb-3" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={question_title} placeholder="Enter title" onChange={(e) => this.setState({ question_title: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Label</Form.Label>
                                <Form.Control type="text" value={question_label} placeholder="Enter label" onChange={(e) => this.setState({ question_label: e.target.value })} />
                            </Form.Group>

                            {!editQuesTitleMode &&
                                <>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Question</Form.Label>
                                        <Form.Control type="text" value={current_question} placeholder="Enter question" onChange={(e) => this.setState({ current_question: e.target.value })} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Answer type</Form.Label>
                                        <Form.Select aria-label="Default select example" value={option_type} onChange={(e) => this.setState({ option_type: e.target.value })}>
                                            <option value={"YesNo"}>Select one option</option>
                                            <option value={"CheckBox"}>Select multiple option</option>
                                            <option value={"answer"}>Write down answer</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {["YesNo", "CheckBox"].includes(option_type) &&
                                        <>
                                            <div className='d-flex justify-content-between  gap-2 mb-3 ' >
                                                <Form.Control className="w-50" id={current_options[0].id} value={current_options[0].name} type="text" placeholder="Option 1" onChange={this.handleCurrentOption} />
                                                <Form.Control className="w-50" id={current_options[1].id} value={current_options[1].name} type="text" placeholder="Option 2" onChange={this.handleCurrentOption} />
                                                <button onClick={this.addOption} type="button" className='button '><i className='fa fa-plus'></i></button>
                                            </div>

                                            <div className='d-flex  flex-wrap mb-3 ' >
                                                {current_options.length > 2 && current_options.slice(2).map((item, i) => {
                                                    return (

                                                        <div className="d-flex mb-3" key={i}>
                                                            <Form.Control id={item.id} value={item.name} type="text" placeholder="New Option" onChange={(e) => this.handleCurrentOption(e, i + 2)} />
                                                            <i className='fa fa-trash option-delete-btn text-danger' onClick={() => this.removeOption(item.id)}></i>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </>
                                    }
                                </>
                            }

                            {editQuesTitleMode ?
                                <button className='sbutton' type='button' onClick={this.handleEditQuesTitleSubmit}>
                                    Update
                                </button>

                                :

                                <button className='sbutton' type='button' onClick={this.handleQuesFormSubmit}>
                                    Submit
                                </button>
                            }
                        </Form>

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


export default connect(mapStateToProps)(Questions)


//////////////////////////////////////////////////





const QuestionlistTable = ({ questionData }) => {

    const [viewQuesModalShow, setViewQuesModalShow] = useState(false);
    const [ques_title, setQuesTitle] = useState('')
    const [ques_type, setQuesType] = useState('')
    const [options, setOptions] = useState([])

    const [quesObj, setQuesObj] = useState([])

    const viewQuestionDetails = (question_obj) => {
        console.log(question_obj, "ques obj")
        setQuesObj(question_obj)
        // setQuesTitle(question_obj.Question?.en);
        // setQuesType(question_obj.Options_Type)
        // setOptions(question_obj.Options)

        setViewQuesModalShow(true);
    }
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: '5%'
        },
        {
            name: "Question",
            selector: row => <div style={{ maxWidth: "50rem" }}>{row?.Question?.en && row.Question?.en}</div>,
            // width: "20%",
        },
        // {
        //     name: "Summery",
        //     selector: row => row?.summary && row.summary,
        //     width: "20%",
        // },
        {
            name: "Option Type",
            selector: row => row?.Options_Type && row.Options_Type,
            width: "15%",
        },
        {
            name: "Action",
            width: "10%",
            cell: (row, index) => <>

                <div className='d-flex justify-content-center'>

                    {/* <button className='button mx-2'
                    ><i className='fa fa-edit'></i></button> */}
                    {/* <button className='button mx-2'
                    onClick={() => this.deleteItem(item.id)}
                    ><i className='text-danger fa fa-trash'></i></button> */}
                    <button className='button mx-2'
                        onClick={() => viewQuestionDetails(row)}
                    ><i className='fa fa-eye'></i></button>
                </div>
            </>
        }
    ]


    const viewQuesModalClose = () => {
        setViewQuesModalShow(false);
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={questionData?.child_category}
                noHeader
                pagination
                fixedHeader
                fixedHeaderScrollHeight='25rem'
                highlightOnHover
            />






            <Modal
                show={viewQuesModalShow}
                onHide={viewQuesModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>
                            View Checklist
                        </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span className='fs-6 fw-bold text-success'>Question: </span>
                        <span className='fs-6 fw-bold'> {quesObj?.Question?.en}</span >
                    </div>
                    {/* <hr></hr> */}

                    <div>
                        <span className='fs-6 fw-bold text-success'>Options:</span>
                        <ul>

                        {quesObj?.Options?.en.map((op, i) =>
                            <li className='fs-6'>{op.name}</li >
                            )}
                            </ul>
                    </div>
                    {/* <h5>Options</h5> */}



                    {quesObj?.multiQuestion?.length > 0 &&
                        <>
                            <hr></hr>

                            <h6 className='fw-bold' style={{ textDecoration: 'underline' }}>Sub Question</h6>
                            {quesObj?.multiQuestion.map((item, i) => {
                                return (
                                    <>
                                        <h6>{item?.Question?.en}</h6>
                                        <h6></h6>
                                        <ul>

                                            {item?.Options?.en?.map((op, i) =>
                                                <li>{op.name}</li>
                                            )}
                                        </ul>

                                    </>

                                )
                            })
                            }
                        </>
                    }



                    {ques_type === 'CheckBox' ?
                        <>
                            {/* {options.map((op, i) =>
                                    <Form.Group className="mb-3" key={i}>
                                        <input type="checkbox" disabled className='mx-3' name="opt_1" />
                                        <Form.Label> {op.name}</Form.Label>
                                    </Form.Group>
                                )} */}
                        </>
                        :
                        ques_type === 'multiple' ?
                            <>
                                {/* {ques_title.options.map((op, i) =>
                                        <Form.Group className="mb-3" >
                                            <input type="checkbox" className='mx-3' name="opt_1" />
                                            <Form.Label> {op.value}</Form.Label>
                                        </Form.Group>
                                    )} */}
                            </>
                            :
                            ques_type === 'answer' ?
                                <></>
                                :
                                <></>
                    }
                </Modal.Body>
            </Modal>

        </>
    )
}

export { QuestionlistTable }