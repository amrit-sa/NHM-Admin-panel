import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addNewAdmin } from '../../actions/user';
import validator from 'validator'

function AdminTable({ userlist, dispatch, toastalert }) {

    const [search, setSearch] = useState("");
    const [filterdata, setFilterdata] = useState(userlist);
    const [adduserModal, setAdduserModal] = useState(false);
    const [editmode, setEditmode] = useState(false);


    const [name, setNname] = useState('')
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(true)
    const [password, setPassword] = useState('')
    const [validPass, setValidPass] = useState(true)


    const resetState = ()=>{
        setNname('')
        setEmail('')
        setValidEmail(true)
        setPassword('')
        setValidPass(true)
    }


    useEffect(() => {
        setFilterdata(userlist)
    }, [userlist])


    useEffect(() => {
        if (userlist && userlist.length > 0) {

            const result = userlist.filter((item) => {
                return item.Name && item.Name.hi && item.Name.hi.toLowerCase().match(search.toLowerCase())
            })
            setFilterdata(result)
        }
    }, [search])

    const columns = [
        // {
        //     name: "Role",
        //     selector: (row) => row.role && row.role,
        // },
        {
            name: "Name",
            selector: (row) => row.Name && row.Name && row.Name
        },
        {
            name: "Email-Id",
            selector: (row) => row.Mobile,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => <>

                <button className='button mx-2'
                //   onClick={() => editDistrict(row._id)}
                ><i className='fa fa-edit'></i></button>

            </>
        }
    ]

    const handleAddUserClick = () => {
        resetState();
        setAdduserModal(true);

    }

    const handleClose = () => {
        setAdduserModal(false);
        resetState();
    }

    const validatePassword = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setValidPass(true)
            return true;
        } else {
            setValidPass(false)
            return false;
        }
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(email.length <=3){
            setValidEmail(false);
            return
        }if (!ValidateEmail(email)) {
            return;
        }

        if(password.length <=8){
            setValidPass(false);
            return
        }if (!validatePassword(password)) {
            return;
        }


        const Newpayload = {
            "name": name,
            "email": email,
            "password": password
        }
        dispatch(addNewAdmin(Newpayload)).then((response) => {
            if (response.code === 200 || response.status == 'success') {

                toastalert('success', 'New Admin user created successfully')
                handleClose()

            } else {
                toastalert('error', response.message)
            }
        })

    }


    const handleNameChange = (e) => {
        setNname(e.target.value)
        // setNname((e.target.value).replace(/[^a-z]/gi, ''))

    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
        // let str = event.target.value
        // if (str && str.length > 2) {
        //     //   this.setState({ isEmail: true })
        //     ValidateEmail(str)
        // }
        // else {
        //   this.setState({ isEmail: false })
        // }
    }


    function ValidateEmail(mail) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mail.match(mailformat)) {
            setValidEmail(true)
            return true
        }
        else {
            setValidEmail(false)
            return false
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setValidPass(true)
    }


    return (
        <>
            <DataTable
                columns={columns}
                data={filterdata}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='400px'
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <button className='button title_btn' onClick={handleAddUserClick} ><i className='fa fa-plus'></i> Add</button>
                }
            />




            <Modal
                show={adduserModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editmode ? 'Update User' :
                            'New Admin'
                        }

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {props.userType === 'CDPO' && */}
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={name} placeholder="Enter name" onChange={handleNameChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email} placeholder="Enter name" onChange={handleEmail} />

                            {
                             !validEmail &&
                                <p className='text-danger'>Please enter Invalid Email Id</p>
                            }

                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" value={password} maxLength="15" onChange={handlePassword} />
                        </Form.Group>

                        {!validPass &&
                                 <>
                                 <h6 className='text-danger'>Enter a strong password of minimum length 8.</h6>
                                 <h6 className='text-danger'>{'Include all (Lowercase,Uppercase,Number,Symbol)'}</h6>
                             </>
                            }  


                        {editmode ?
                            <button
                                className='sbutton'
                                variant="primary"
                                type='submit'
                            //   disabled={(validNum === true && name.length > 0) ? false : true}
                            >

                                Update
                            </button>

                            :
                            <button
                                className='sbutton'
                                variant="primary"
                                type='submit'
                            // disabled={(validNum === true && name.length > 0) ? false : true}
                            >

                                Submit
                            </button>
                        }
                    </Form>
                    {/* } */}

                </Modal.Body>

            </Modal>
        </>

    );
}

export default AdminTable;