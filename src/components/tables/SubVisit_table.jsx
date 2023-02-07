import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { addVisitCategory, getChecklist, updateVisitCategory, addVisitCatQues } from '../../actions/survey';
import { Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

const SubVisitTable = ({ title, toastalert, dispatch, selected_visit, visitCategories, setShowSubVisit, setSubVisitData, selected_visit_category, handleViewQuestions }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showsubvisitModal, setShowSubVisitModal] = useState(false)
    const [visitcat, setVisitcat] = useState('');
    const [visitId, setVisitId] = useState('')
    const [subvisitId, setSubVisitId] = useState('')
    const [editmode, setEditmode] = useState(false);
    // const [checklistData, setChecklistData] = useState([])

    const [showChecklistQuesList, setShowChecklistQuesList] = useState(false);

    const handleAddSubVisit = () => {
        setShowSubVisitModal(true)
    }

    const handleClose = () => {
        setEditmode(false);
        setShowSubVisitModal(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (editmode) {
            const update_payload = {
                category_id: visitId,
                sub_category_id: subvisitId,
                sub_category_name: visitcat
            }

            dispatch(updateVisitCategory(update_payload)).then((response) => {
                if (response.code === 200 && response.status === 'success') {
                    toastalert('success', 'Visit category updated successfully')
                } else {
                    toastalert('error', 'Error while processing this request!')

                }
                handleClose();
            })

        } else {

            const payload = {
                category_id: selected_visit._id,
                sub_category_name: visitcat
            }

            dispatch(addVisitCategory(payload)).then((response) => {
                if (response.code === 200 && response.status === 'success') {
                    toastalert('success', 'Visit category added successfully')
                } else {
                    toastalert('error', 'Error while processing this request!')

                }
                handleClose();
            })
        }

    }

    const editVisitCategory = (item) => {
        setVisitcat(item.sub_category_title);    // selecting edit visit category name
        setVisitId(item.category_id);    // selecting edit visit id
        setSubVisitId(item.sub_category_id);    // selecting edit visit category id

        setEditmode(true);    // set edit mode on
        setShowSubVisitModal(true);  // open modal
    }


    const handleViewChecklist = (obj) => {
        // view checklist local
        // new
        setShowChecklistQuesList(obj)




        // old
        // dispatch(getChecklist(val)).then((response) => {
        //     if (response.code === 200 && response.status === 'success') {
        //         setChecklistData(response.QuestionOptions)
        //     }
        // })

        // this.props.navigate('/visits/checklists/1')
        // this.setState({showchecklistPage :  true});
    }


    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: '15%'
        },
        {
            name: t("title"),
            selector: row =>
                <div className="d-flex flex-column gap-1">
                    <span>
                        {row.subcategory_title?.en && row.subcategory_title.en}
                        {' - '}
                        {row.subcategory_title?.gu && row.subcategory_title.gu}

                    </span>
                </div>
        },

        {
            name: t("action"),
            width: '20%',

            cell: (row, index) => <>

                {/* <button className='button mx-2'
          onClick={() => editUser(row)}
        ><i className='fa fa-edit'></i></button>

        <button className='button mx-2'
          onClick={() => handleReset(row.Mobile)}
        ><i className="fa fa-refresh" aria-hidden="true"></i>
        </button> */}


                <div className='d-flex justify-content-center'>

                    <button
                        className='button button-icon mx-2'
                        disabled
                        onClick={() => editVisitCategory(row)}
                    >
                        <i className='fa fa-edit'></i>
                    </button>

                    {/* <button className='button button-icon mx-2' onClick={() => deleteVisit(row._id)}><i className='text-danger fa fa-trash'></i></button> */}

                    {/* <Link className='button button-icon mx-2' to={`/checklists/${index + 1}`}><i className=' fa fa-eye'></i></Link> */}
                    <button className='button button-icon mx-2'
                        onClick={() => handleViewChecklist(row)}
                    ><i className=' fa fa-info'></i></button>



                    <button className='button button-icon mx-2'
                        onClick={() => handleViewQuestions(row)}
                    ><i className=' fa fa-eye'></i></button>

                </div>
            </>
        }
    ]


    return (
        <>


            <header>
                <div className='d-flex justify-content-between '>
                    <span className='fs-5 px-2 font-primary'>{title}</span>

                </div>
            </header>

            <div className="pt-0 pb-2 sub-wrapper">

                <header>
                    <div className='d-flex justify-content-between '>
                        <i className="fa fa-arrow-circle-left back_btn fs-3"
                            onClick={() => {
                                setShowSubVisit(false)
                                // setSubVisitData([])
                                navigate('/visits')
                            }}></i>


                        <button className='button title_btn py-0 ' disabled onClick={handleAddSubVisit}><i className='fa fa-plus'></i> Add Visit Category</button>
                    </div>

                </header>


                <DataTable
                    columns={columns}
                    data={visitCategories}
                    noHeader
                    // pagination
                    fixedHeader
                    fixedHeaderScrollHeight='400px'
                    highlightOnHover
                />
            </div>

            {showChecklistQuesList && Object.keys(showChecklistQuesList).length > 0 &&
                <ChecklistTable
                    // checklistData={checklistData}
                    checklistData={showChecklistQuesList}
                    selected_visit_category={selected_visit_category}
                    selected_visit={selected_visit}
                    toastalert={toastalert}
                    dispatch={dispatch}
                />
            }


            <Modal
                show={showsubvisitModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>

                        Add visit category

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>

                        <div className="row">
                            <Form.Label>Title</Form.Label>

                            <div className="col-6">
                                <Form.Group className="mb-3" >
                                    <Form.Control required type="text" value={visitcat} placeholder="English Category name"
                                        onChange={(e) => setVisitcat(e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group className="mb-3" >
                                    <Form.Control required type="text" value={visitcat} placeholder="Gujrati Category name"
                                        onChange={(e) => setVisitcat(e.target.value)} />
                                </Form.Group>
                            </div>
                        </div>


                        <Form.Group className="mb-3" >
                            <Form.Label>Question</Form.Label>
                            <Form.Control required type="text" value={visitcat} placeholder="Enter Question"
                                onChange={(e) => setVisitcat(e.target.value)} />
                        </Form.Group>

                        <button className='sbutton' type='submit' >
                            Submit
                        </button>

                    </Form>
                </Modal.Body>

            </Modal>


        </>

    );
}

function mapStateToProps(state) {
    const { selected_visit, visitCategories, selected_visit_category } = state.survey;

    return {
        visitCategories,
        selected_visit,
        selected_visit_category
    };
}
export default connect(mapStateToProps, null)(SubVisitTable);






const ChecklistTable = ({ checklistData, selected_visit_category, selected_visit, toastalert, dispatch }) => {

    const { t } = useTranslation();

    const [viewCheckModalShow, setViewCheckModalShow] = useState(false)
    const [ques_title, setQuesTitle] = useState('')
    const [ques_type, setQuesType] = useState('')
    const [options, setOptions] = useState([])
    const [vistCatQuesAddModal, setVistCatQuesAddModal] = useState(false);

    const [editCheckModalShow, setEditCheckModalShow] = useState(false);

    // For adding new checklist question
    const [current_question, setCurrentQuestion] = useState("");
    const [option_type, setOptionType] = useState('YesNo')
    const [current_options, setCurrentOptions] = useState([{ id: parseInt(Math.random() * 100000), name: "" }, { id: parseInt(Math.random() * 100000), name: "" }]);

    const [editMode, setEditMode] = useState(false)

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: '80px'
        },
        {
            name: t("question"),
            selector: row =>
                <div className="d-flex flex-column gap-1"

                >
                    <span>

                        {row?.about_data?.Question?.en && row?.about_data?.Question.en}
                    </span>
                    <span>
                        {row?.about_data?.Question?.gu && row?.about_data?.Question.gu}

                    </span>
                </div>
        },
        {
            name: t("action"),
            width: "200px",
            cell: (row, index) => <>

                <div className='d-flex justify-content-center'>

                    <button className='button mx-2'
                        onClick={() => handleEditChecklist(row)}
                        disabled
                    ><i className='fa fa-edit'></i></button>
                    {/* <button className='button mx-2'
                    // onClick={() => this.deleteItem(item.id)}
                    ><i className='text-danger fa fa-trash'></i></button> */}
                    <button className='button mx-2'
                        onClick={() => viewChecklist(row)}
                    ><i className='fa fa-eye'></i></button>
                </div>
            </>
        }
    ]


    const viewChecklist = (obj) => {      // VIEW QUESTION MODEL OPEN
        // const { checklists } = this.props;
        // const ques_title = checklists.find((ques) => ques.id === ques_id);
        setOptions(obj?.about_data?.Options)
        setQuesType(obj?.about_data?.Options_Type)
        setQuesTitle(obj?.about_data?.Question)

        setViewCheckModalShow(true)
    }

    const viewCheckModalClose = () => {      // VIEW QUESTION MODEL CLOSE
        setViewCheckModalShow(false);
    }

    const handleEditChecklist = (item) => {      // SHOW QUESTION ADD/EDIT MODAL ON EDIT CLICK
        setEditMode(true);

        setCurrentQuestion(item.question)
        setOptionType(item.option_type)
        setCurrentOptions(item.options)

        setVistCatQuesAddModal(true);
    }

    const handleCheckQuesAddClick = () => {       // SHOW QUESTION ADD/EDIT MODAL ON ADD CLICK
        setVistCatQuesAddModal(true);
    }

    const handleVistCatQuesAddModalClose = () => {    // HIDE QUESTION ADD/EDIT MODAL ON CLOSE BTN CLICK
        setCurrentOptions(['', '']);
        setOptionType('YesNo');
        setCurrentQuestion('')
        setEditMode(false)

        setVistCatQuesAddModal(false)
    }


    const handleCurrentOption = (e) => {             // UPDATE OPTIONS 
        const { id, value } = e.target
        let obj = current_options.map((item) => {
            if (Number(item.id) === Number(id)) {
                return { ...item, ["name"]: value }
            }
            else {
                return item
            }
        })
        setCurrentOptions(obj);
    }

    const addOption = () => {                       // ADD NEW OPTION
        setCurrentOptions([...current_options, { id: parseInt(Math.random() * 100000), name: "" }]);
    }
    const removeOption = (index) => {              // REMOVE AN OPTION
        setCurrentOptions(current_options.filter((obj) => obj.id !== index))
    }

    const handleQuesFormSubmit = (e) => {              // SUBMIT FORM ON ADD/EDIT QUESTION
        e.preventDefault();

        if (editMode) {                      // EDIT MODE IS ON,  SO CALL UPDATE FUNCTION 


        } else {                             // EDIT MODE IS OFF,  SO CALL  ADD FUNCTION 

            const payload = {
                category_id: selected_visit._id,
                sub_category_id: selected_visit_category.sub_category_id,
                about_title: selected_visit_category.sub_category_title,
                about_data_answer: option_type,
                about_data_question: current_question,
                about_data_options: current_options.map(obj => obj.name),
                about_data_optionType: option_type,
                about_data_summary: "",
                about_data_problem: [],
                about_data_isFilter: true,
                about_data_status: "Active",
                about_data_action: "",
                about_data_multiQuestion: []
            }

            dispatch(addVisitCatQues(payload)).then((response) => {
                if (response.code === 200 && response.status === 'success') {
                    toastalert('success', 'Visit category question added successfully')
                } else {
                    toastalert('error', 'Error while processing this request!')
                }
                handleVistCatQuesAddModalClose();
            })
        }


    }








    return (


        <>
            {checklistData.category.length > 0 &&
                <div className='container pt-0 sub-wrapper mt-3'>
                    <header>
                        {/* <div className="row">
                    <h5>{selected_visit && selected_visit.title}</h5>
                </div> */}
                        <div className='d-flex justify-content-between '>
                            <div className="d-flex align-items-center justify-content-between">

                                <span className='heading fs-5   px-4'>
                                    {checklistData?.subcategory_title?.en + " (" + checklistData?.subcategory_title?.gu + ")"}
                                    {/* <Form.Select aria-label="Default select example" onChange={(e) => this.changeSection(e.target.value)}>
                            {selected_visit && selected_visit.sections && selected_visit.sections.length > 0 && selected_visit.sections.map((sec, i) =>
                                <option value="bmj" key={i}>{sec.title}</option>
                                )}
                            </Form.Select> */}
                                </span>
                            </div>
                            {selected_visit_category?.sub_category_title &&
                                <button className='button mx-2'
                                    onClick={handleCheckQuesAddClick}
                                ><i className='fa fa-plus'> </i> Add </button>
                            }
                        </div>
                    </header>





                    <DataTable
                        columns={columns}
                        data={checklistData.category}
                        noHeader
                        // pagination
                        fixedHeader
                        fixedHeaderScrollHeight='30rem'
                        highlightOnHover
                    />

                </div>
            }


            <Modal
                show={vistCatQuesAddModal}
                onHide={handleVistCatQuesAddModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editMode ? 'Edit Question' : 'Add Question'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={handleQuesFormSubmit}
                    >
                        <Form.Group className="mb-3" >
                            <Form.Label>Question</Form.Label>
                            <Form.Control type="text" value={current_question} placeholder="Enter question" onChange={(e) => setCurrentQuestion(e.target.value)} />
                        </Form.Group>


                        <Form.Group className="mb-3" >
                            <Form.Label>Answer type</Form.Label>
                            <Form.Select aria-label="Default select example" value={option_type} onChange={(e) => setOptionType(e.target.value)}>
                                <option value={"YesNo"}>Select one option</option>
                                <option value={"CheckBox"}>Select multiple option</option>
                                <option value={"answer"}>Write down answer</option>
                            </Form.Select>

                        </Form.Group>

                        {["YesNo", "CheckBox"].includes(option_type) &&
                            <>
                                <div className='d-flex justify-content-between  gap-2 mb-3 ' >
                                    <Form.Control className="w-50" id={current_options[0].id} value={current_options[0].name} type="text" placeholder="Option 1" onChange={handleCurrentOption} />
                                    <Form.Control className="w-50" id={current_options[1].id} value={current_options[1].name} type="text" placeholder="Option 2" onChange={handleCurrentOption} />
                                    <button onClick={addOption} type="button" className='button '><i className='fa fa-plus'></i></button>
                                </div>

                                <div className='d-flex  flex-wrap mb-3 ' >
                                    {current_options.length > 2 && current_options.slice(2).map((item, i) => {
                                        return (

                                            <div className="d-flex mb-3" key={i}>
                                                <Form.Control id={item.id} value={item.name} type="text" placeholder="New Option" onChange={(e) => handleCurrentOption(e, i + 2)} />
                                                <i className='fa fa-trash option-delete-btn text-danger' onClick={() => removeOption(item.id)}></i>
                                            </div>

                                        )
                                    })}
                                </div>

                            </>
                        }

                        <button className='sbutton' type='submit' >
                            {editMode ? 'Update' : 'Submit'}
                        </button>
                    </Form>

                </Modal.Body>

            </Modal>





            <Modal
                show={viewCheckModalShow}
                onHide={viewCheckModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>
                View Checklist
            </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <h5>Question: {ques_title?.en}</h5>
                    <hr></hr>
                    <h5>Options</h5>
                    {options?.en?.map((op, i) =>
                        <div>{op.name}</div>
                    )}

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
                        ques_type === 'CheckBox' ?
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

export { ChecklistTable }