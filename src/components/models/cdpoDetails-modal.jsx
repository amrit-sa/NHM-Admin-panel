import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import Dropdown from "react-bootstrap/Dropdown";
import ms_image from '../../icons/user-3.png'
import aww_image from '../../icons/user-1.jpg'
import { getUserDetails } from '../../actions/user'
import moment from 'moment'

const CdpoDetailsModal = (props) => {



    const handleClose = () => {
        setDetailModal(false)
        setMsDetailModal(false);
        setSelectedAww({});
        setCDPODetails({})
        setDPODetails({})
    }
    const [detailModal, setDetailModal] = useState(false);

    const [dpo_Details, setDPODetails] = useState({});
    const [mappedCDPO, setMappedCDPO] = useState([]);

    const [cdpo_Details, setCDPODetails] = useState({});
    const [cdpomappedMS, setCDPOMappedMS] = useState([]);


    const [msDetailModal, setMsDetailModal] = useState(false);
    const [msDetails, setMsDetails] = useState([]);

    const [mappedAww, setMappedAWW] = useState([]);
    const [selected_aww, setSelectedAww] = useState({});


    useEffect(() => {
        const { userModalpayload, dispatch } = props;
        if (userModalpayload && Object.keys(userModalpayload).length > 0) {
            console.log(userModalpayload)
            if (userModalpayload.role === 'DPO') {
                const dpo_payload = {
                    user_id: userModalpayload._id,
                    role: ''
                }

                dispatch(getUserDetails(dpo_payload)).then((response) => {
                    if (response && response.code === 200) {
                        setDPODetails(userModalpayload);
                        setMappedCDPO(response.mappedUser);
                    }
                })
            } else
                if (userModalpayload.role === 'CDPO') {
                    const cdpo_payload = {
                        user_id: userModalpayload._id,
                        role: ''
                    }
                    dispatch(getUserDetails(cdpo_payload)).then((response) => {
                        if (response && response.code === 200) {
                            setCDPODetails(userModalpayload);
                            setCDPOMappedMS(response.mappedUser);
                        }
                    })
                    setDPODetails([])
                    setMappedCDPO([])

                } else if (userModalpayload.role === 'MS') {
                    setCDPODetails([])
                    handle_msboxclick(userModalpayload)
                }
            setDetailModal(true);
        } else {
            setDetailModal(false)
        }

    }, [props.userModalpayload])

    const handle_cdpoboxclick = (cdpo_details) => {
        const payload = {
            user_id: cdpo_details.id,
            role: ''
        }
        setCDPODetails(cdpo_details);
        props.dispatch((getUserDetails(payload))).then((response) => {
            if (response.code === 200 && response.status === 'success') {
                setCDPOMappedMS(response.mappedUser)
            }
        })


        // empty ms and aww list
        setSelectedAww({})
        setMsDetailModal(false)
    }

    const handle_msboxclick = (ms_details) => {
        const payload = {
            user_id: ms_details.id,
            role: 'MS'
        }
        console.log(payload)
        props.dispatch((getUserDetails(payload))).then((response) => {
            if (response.code === 200 && response.status === 'success') {
                setMappedAWW(response.mappedUser)
            }
        })
        setMsDetails(ms_details)
        setSelectedAww({});
        setMsDetailModal(true);
    }

    const handleDpoModalClose = () => {
        handleClose()
        setDPODetails({})
    }
    const handleCdpoModalClose = () => {
        setCDPODetails({})
    }
    const handleMsModalClose = () => {
        setMsDetailModal(false);
    }
    const handleAWWModalClose = () => {
        setSelectedAww({})
    }
    const handle_awwboxclick = (aww_id) => {
        const selected_AWW = mappedAww.find((item) => {
            return item._id === aww_id;
        })
        setSelectedAww(selected_AWW);
    }

    return (
        <>


            <Modal
                show={detailModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='left-modal user-detail-modal'
            >
                <Modal.Header closeButton className="userdetail-modal py-2">
                </Modal.Header>

                <Modal.Body className="p-0 d-flex gap-2">
                    {dpo_Details && Object.keys(dpo_Details).length > 0 &&
                        <div className="dpo-wrapper" style={{ width: "21rem" }}>

                            <>

                                <div className='fs-6 font-primary container py-2 userdetail-modal d-flex justify-content-between align-items-center'>
                                    DPO: {dpo_Details?.Name?.en && dpo_Details?.Name?.en}
                                    <i className='fa fa-close cursor-point'
                                onClick={handleDpoModalClose}
                            ></i>
                                </div>
                                <div className="user-box-wrapper">

                                    <div className="user-info-block">
                                        <table
                                            className="cdpo-info-table"

                                        >
                                            <tbody style={{ height: "auto" }}>

                                                <tr>
                                                    <th>
                                                        Mobile
                                                    </th>
                                                    <td>{dpo_Details?.Mobile && dpo_Details.Mobile}</td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Status
                                                    </th>
                                                    <td>{dpo_Details?.status && dpo_Details.status}</td>
                                                </tr>

                                                <tr>
                                                    <th>
                                                        Created Date
                                                    </th>
                                                    <td>{dpo_Details?.createdDate && moment(dpo_Details.createdDate).format('YYYY-MM-DD')}</td>
                                                </tr>

                                                {/* <tr>
                                                    <th>
                                                        Districts
                                                    </th>
                                                    <td>
                                                        {cdpo_Details?.mapped_district?.length > 0 &&
                                                            cdpo_Details?.mapped_district.map((district, i) => {
                                                                return (
                                                                    <span key={i} className='list-box'>{district}{i + 1 === cdpo_Details?.mapped_district.length ? '' : ','}</span>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>
                                                        Projects
                                                    </th>
                                                    <td>
                                                        {cdpo_Details?.mapped_project?.length > 0 &&
                                                            cdpo_Details?.mapped_project.map((projects, i) => {
                                                                return (
                                                                    <span key={i} className='list-box'>{projects}{i + 1 === cdpo_Details?.mapped_project.length ? '' : ','}</span>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>
                                                        Sector
                                                    </th>
                                                    <td>
                                                        {cdpo_Details?.mapped_sector?.length > 0 &&
                                                            cdpo_Details?.mapped_sector.map((sector, i) => {
                                                                return (
                                                                    <span key={i} className='list-box'>{sector}{i + 1 === cdpo_Details?.mapped_sector.length ? '' : ','}</span>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr> */}

                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="" >
                                        <h5 className="container">List of CDPO</h5>
                                        <div className='d-flex flex-wrap gap-4 py-1 px-3 justify-content-evenly'>


                                            {mappedCDPO?.length > 0 && mappedCDPO.map((item) => {
                                                return (
                                                    <>
                                                        <div className='d-flex justify-content-center flex-column ms-box cursor-point'
                                                            onClick={() => handle_cdpoboxclick(item)}>
                                                            <img src={ms_image} width={40} className="rounded-circle" />
                                                            <div className='box-title font-primary'>{item?.Name?.en}</div>
                                                            <div className='font-secondary'>{item.Mobile}</div>
                                                            {/* <div className='font-secondary'>{item.mapped_sector.map((sec, i) => {
                                                                return (
                                                                   <div>{i + 1 === item?.mapped_sector.length ? sec : sec+','} </div>
                                                                )
                                                            })
                                                            }
                                                            </div> */}
                                                            <div className='font-secondary'>{item.district?.en}</div>

                                                        </div>

                                                    </>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>

                            </>
                        </div>
                    }


                    {cdpo_Details && Object.keys(cdpo_Details).length > 0 &&
                        <div className="cdpo-wrapper" style={{ width: "21rem" }}>

                            <>

                                <div className='fs-6 font-primary container py-2 userdetail-modal d-flex justify-content-between align-items-center'>
                                    CDPO: {cdpo_Details?.Name?.en && cdpo_Details.Name.en}
                                    <i className='fa fa-close cursor-point'
                                onClick={handleCdpoModalClose}
                            ></i>
                                </div>
                                <div className="user-box-wrapper">

                                    <div className="user-info-block">
                                        <table
                                            className="cdpo-info-table"

                                        >
                                            <tbody style={{ height: "auto" }}>

                                                <tr>
                                                    <th>
                                                        Mobile
                                                    </th>
                                                    <td>{cdpo_Details?.Mobile && cdpo_Details.Mobile}</td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Status
                                                    </th>
                                                    <td>{cdpo_Details?.status && cdpo_Details.status}</td>
                                                </tr>

                                                {/* <tr>
                                                    <th>
                                                        Created Date
                                                    </th>
                                                    <td>{cdpo_Details?.cdpo_createdDate && moment(cdpo_Details.cdpo_createdDate).format('YYYY-MM-DD')}</td>
                                                </tr> */}

                                                <tr>
                                                    <th>
                                                        Districts
                                                    </th>
                                                    <td>{cdpo_Details?.district?.en && cdpo_Details.district.en}</td>

                                                    {/* <td>
                                                        {cdpo_Details?.mapped_district?.length > 0 &&
                                                            cdpo_Details?.mapped_district.map((district, i) => {
                                                                return (
                                                                    <span key={i} className='list-box'>{district}{i + 1 === cdpo_Details?.mapped_district.length ? '' : ','}</span>
                                                                )
                                                            })
                                                        }
                                                    </td> */}
                                                </tr>

                                                {/* <tr>
                                                    <th>
                                                        Projects
                                                    </th>
                                                    <td>
                                                        {cdpo_Details?.mapped_project?.length > 0 &&
                                                            cdpo_Details?.mapped_project.map((projects, i) => {
                                                                return (
                                                                    <span key={i} className='list-box'>{projects}{i + 1 === cdpo_Details?.mapped_project.length ? '' : ','}</span>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>
                                                        Sector
                                                    </th>
                                                    <td>
                                                        {cdpo_Details?.mapped_sector?.length > 0 &&
                                                            cdpo_Details?.mapped_sector.map((sector, i) => {
                                                                return (
                                                                    <span key={i} className='list-box'>{sector}{i + 1 === cdpo_Details?.mapped_sector.length ? '' : ','}</span>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr> */}

                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="" >
                                        <h5 className="container">List of MS</h5>
                                        <div className='d-flex flex-wrap gap-4 py-1 px-3 justify-content-evenly'>


                                            {cdpomappedMS?.length > 0 && cdpomappedMS.map((item) => {
                                                return (
                                                    <>
                                                        <div className='d-flex justify-content-center flex-column ms-box cursor-point'
                                                            onClick={() => handle_msboxclick(item)}>
                                                            <img src={ms_image} width={40} className="rounded-circle" />
                                                            <div className='box-title font-primary'>{item.Name?.en}</div>
                                                            <div className='font-secondary'>{item.Mobile}</div>
                                                            
                                                            {/* <div className='font-secondary'>{item.mapped_sector.map((sec, i) => {
                                                                return (
                                                                   <div>{i + 1 === item?.mapped_sector.length ? sec : sec+','} </div>
                                                                )
                                                            })
                                                            }
                                                            </div> */}
                                                        </div>

                                                    </>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    }



                    <div className={`${!msDetailModal && 'd-none'} ms-wrapper `} style={{ width: "21rem" }} >
                        <div className='fs-6 font-primary container py-2 msuserdetail-modal d-flex justify-content-between align-items-center'>
                            MS: {msDetails?.Name?.en && msDetails.Name?.en}
                            <i className='fa fa-close cursor-point'
                                onClick={handleMsModalClose}
                            ></i>
                        </div>
                        <div className="user-box-wrapper">
                            <div className="ms-info-block">
                                <table
                                    className="ms-info-table"

                                >
                                    <tbody style={{ height: "auto" }}>

                                        <tr>
                                            <th>
                                                Mobile
                                            </th>
                                            <td>{msDetails?.Mobile && msDetails.Mobile}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Status
                                            </th>
                                            <td>{msDetails?.status ? msDetails.status : "Active"}</td>
                                        </tr>
                                        {/* <tr>
                                            <th>
                                                Created Date
                                            </th>
                                            <td>{msDetails?.created_date && moment(msDetails.created_date).format('YYYY-MM-DD')}</td>
                                        </tr> */}

                                        <tr>
                                            <th>
                                                Districts
                                            </th>
                                            <td>{msDetails?.district?.en && msDetails.district?.en}</td>

                                            {/* <td>
                                                {msDetails?.mapped_district?.length > 0 &&
                                                    msDetails?.mapped_district.map((district, i) => {
                                                        return (
                                                            <span key={i} className='list-box'>{district}{i + 1 === msDetails?.mapped_district.length ? '' : ','}</span>
                                                        )
                                                    })
                                                }
                                            </td> */}
                                        </tr>

                                        {/* 

                                        <tr>
                                            <th>
                                                Sector
                                            </th>
                                            <td>
                                                {msDetails?.mapped_sector?.length > 0 &&
                                                    msDetails?.mapped_sector.map((sector, i) => {
                                                        return (
                                                            <span key={i} className='list-box'>{sector}{i + 1 === msDetails?.mapped_sector.length ? ' ' : ','}</span>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr> */}

                                    </tbody>
                                </table>
                            </div>

                            <div className="" >
                                <h5 className='container'>List of AWW</h5>
                                <div className='d-flex flex-wrap gap-4 py-1 px-3 justify-content-evenly'>

                                    {mappedAww?.length > 0 && mappedAww.map((item) => {
                                        return (
                                            <>
                                                <div className='d-flex justify-content-center flex-column aww-box cursor-point'
                                                    onClick={() => handle_awwboxclick(item._id)}>
                                                    <img src={aww_image} width={40} className="rounded-circle" />
                                                    <div className='box-title font-primary'>{item.Name?.en}</div>
                                                    <div className='font-secondary'>{item.Mobile}</div>
                                                    {/* <div className='font-secondary'>{item.awc_name}</div> */}
                                                    {/* <div className='font-secondary'>{item.mapped_district[0]}</div>
                                        <div className='font-secondary'>{item.mapped_project[0]}</div>
                                        <div className='font-secondary'>{item.mapped_sector[0]}</div> */}

                                                </div>

                                            </>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>


                    {selected_aww && Object.keys(selected_aww).length > 0 &&
                        <div className="aww-wrapper" style={{ width: "21rem" }}>
                            <div className='fs-6 font-primary container py-2 awwuserdetail-modal d-flex justify-content-between align-items-center'>
                                AWW: {selected_aww?.Name?.en && selected_aww.Name?.en}
                                <i className='fa fa-close cursor-point'
                                    onClick={handleAWWModalClose}
                                ></i>
                            </div>
                           
                            <div className="aww-info-block">
                                <table
                                    className="aww-info-table"

                                >
                                    <tbody style={{ height: "auto" }}>

                                        <tr>
                                            <th>
                                                Mobile
                                            </th>
                                            <td>{selected_aww?.Mobile && selected_aww.Mobile}</td>
                                        </tr>

                                        {/* <tr>
                                            <th>
                                                AWC Name
                                            </th>
                                            <td>
                                                <span className='list-box'>{selected_aww?.awc_name}</span>
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <th>
                                                Created Date
                                            </th>
                                            <td>{selected_aww?.Created_Date && moment(selected_aww.Created_Date).format('YYYY-MM-DD')}</td>
                                        </tr>

                                        <tr>
                                            <th>
                                                Districts
                                            </th>
                                            <td>
                                            {selected_aww?.District?.en && selected_aww.District?.en}

                                                {/* {selected_aww?.mapped_district?.length > 0 &&
                                                    selected_aww?.mapped_district.map((district, i) => {
                                                        return (
                                                            <span key={i} className='list-box'>{district}{i + 1 === msDetails?.mapped_district.length ? '' : ','}</span>
                                                        )
                                                    })
                                                } */}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>
                                            City
                                            </th>
                                            <td>
                                            {selected_aww?.City && selected_aww.City}

                                            </td>
                                        </tr>

                                        <tr>
                                            <th>
                                                Sector
                                            </th>
                                            <td>
                                            {selected_aww?.Sector?.en && selected_aww.Sector?.en}
                                                {/* {selected_aww?.mapped_sector?.length > 0 &&
                                                    selected_aww?.mapped_sector.map((sector, i) => {
                                                        return (
                                                            <span key={i} className='list-box'>{sector}{i + 1 === msDetails?.mapped_sector.length ? '' : ','}</span>
                                                        )
                                                    })
                                                } */}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>
                                                Taluka
                                            </th>
                                            <td>
                                            {selected_aww?.Taluka?.en && selected_aww.Taluka?.en}
                                       
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>


                        </div>

                    }

                </Modal.Body>




            </Modal>




        </>
    );
}

export default CdpoDetailsModal;