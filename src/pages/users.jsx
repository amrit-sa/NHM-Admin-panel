import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import UserModal from '../components/models/user-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { getDistricts, getSectors } from '../actions/area';
import { getAllUsers, getAWWUsers, getDashboardUsers, getUserCount } from '../actions/user';
import CdpoTable from '../components/tables/cdpo_table';
import MsTable from '../components/tables/ms_table';
import DashboardUserTable from '../components/tables/DashboardUserTable';
import AdminTable from '../components/tables/admin_table';
import BulkUpload from '../components/models/bulk-upload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardUserModal from '../components/models/DashboardUserModal';
import logo from '../icons/appUser.png';
import dashboard_logo from '../icons/dashboard_icon.png';
import admin_logo from '../icons/home_icon1.png';
import { useTranslation } from 'react-i18next'
import { getGhataks } from '../actions/projects';
import editIcon from '../icons/edit.png';
import Modal from 'react-bootstrap/Modal';
import FilterModalComponent from '../components/models/filter-Modal';

const Users = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { cat, type } = useParams();
  const [showmodal, setShowmodal] = useState(false)
  const [showDashboardmodal, setDashboardShowmodal] = useState(false)
  const [userType, setUserType] = useState('DPO')
  const [userCat, setUserCat] = useState('')
  const [appUserCount, setUserCount] = useState(props.app_user_count)
  const [dashboardUserCount, setDashboardUserCount] = useState(props.dashboard_user_count)
  const [awwUserlist, setAwwUserList] = useState(props.aww_users); // old
  const [appWorkerlist, setAppWorkerList] = useState(props.app_workers); // new
  const [userlist, setUserList] = useState(props.app_users);
  const [allUsers, setAllUsers] = useState(props.app_users);
  const [alldashUser, setAllDashUser] = useState(props.dashboard_users);
  const [dashuserlist, setDashUserlist] = useState(props.dashboard_users);
  const [bulkmodalshow, setBulkModalShow] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const [filterModal, setFilterModal] = useState(false);

  const handleClose = () => {
    setEditMode(false)
    setEditData({})
    setShowmodal(false)
    setDashboardShowmodal(false)
  }
  const handleShow = () => setShowmodal(true)
  const handleDashboardShow = () => setDashboardShowmodal(true)

  const selectCat = (cat) => {
    navigate('/users/' + cat)
    setUserCat(cat);
    if (cat === 'App') {
      if (props.allDistricts.length === 0) {
        props.dispatch(getDistricts());     //   load districts in redux state
      }

      if (props.app_users.length === 0) {
        fetchAppUserList();  // Load App Users    
      }
    }

    if (cat === 'Dashboard' && props.dashboard_users.length === 0) {
      loadDashboardUsers();  // Load Dashboarf Users
    }

  }

  useEffect(() => {
    if (userCat.length > 0) {
      if (!cat) {
        setUserCat('')
      }
    }
  }, [cat])


  const getUsersCount = () => {
    props.dispatch(getUserCount()).then((response) => {
      if (response.code === 200 && response.status === 'success') {
        const dashbaordUserCount = (response?.dpoCount ? response?.dpoCount : 0) + (response?.cdpoCount ? response?.cdpoCount : 0) + (response?.stateUserCount ? response?.stateUserCount : 0)
        const appUserCount = (response?.dpoCount ? response?.dpoCount : 0) + (response?.cdpoCount ? response?.cdpoCount : 0) + (response?.msCount ? response?.msCount : 0) + + (response?.awwCount ? response?.awwCount : 0)

        setDashboardUserCount(dashbaordUserCount);
        setUserCount(appUserCount)
      }
    })
  }

  useEffect(() => {
    const { app_user_count, dashboard_user_count } = props
    if (!app_user_count || !dashboard_user_count) {
      getUsersCount()
    }
  }, [])

  useEffect(() => {
    // if(props.app_users.length===0){
    //   fetchAppUserList();  // Load App Users    
    // }
    // if(props.dashboard_users.length===0){
    //   loadDashboardUsers();  // Load Dashboarf Users
    // }
    const userArr = props.app_users;
    userArr.forEach((obj, i) => {
      obj.index = i + 1
    });
    setUserList(userArr);   // PUTTING DPO DATA IN THE UERLIST
    setAllUsers(userArr)    // SAVING ALL DPO DATA IN ALL USERS LIST
  }, [JSON.stringify(props.app_users)])

  const fetchAppUserList = () => {
    props.dispatch(getAllUsers()).then((response) => {
      if (response.code === 200) {
        const userArr = response.getUser;
        userArr.forEach((obj, i) => {
          obj.index = i + 1
        });

        setAllUsers(userArr)
        setUserList(userArr)
      }
    })
  }

  const fetchAppWorkorList = (role) => {
    if (appWorkerlist.length === 0) {   // check if API for getting worker data has been called yet or not
      //  CALLING THE GET WORKER LIST API 
      props.dispatch(getAWWUsers()).then((response) => {
        if (response.code === 200) {
          // setAwwUserList(response.getWorker) // old
          const userArr = response.getWorker;
          userArr.forEach((obj, i) => {
            obj.index = i + 1
          });
          setAppWorkerList(userArr) // new

          if (!role || role === '') {
            setUserList(userArr)
          } else {
            //  FILTERING THE WORKER LIST AS PER THE SELCTED ROLE
            let filterd_data = response.getWorker.filter((item) => {
              return item.role.toUpperCase() === role.toUpperCase()
            })
            filterd_data.forEach((obj, i) => {
              obj.index = i + 1
            });
            setUserList(filterd_data)
          }


        }
      })
    } else {
      // IF WE ALREADY HAVE WORKER DATA THEN SIMPLY JUST FILTER LIST AS PER SELECTED ROLE
      let filterd_data = appWorkerlist.filter((item) => {
        return item.role.toUpperCase() === role.toUpperCase()
      })
      filterd_data.forEach((obj, i) => {
        obj.index = i + 1
      });
      setUserList(filterd_data)
    }

  }

  const loadDashboardUsers = () => {
    props.dispatch(getDashboardUsers()).then((response) => {
      if (response.code === 200) {
        let allUsers = response.DashboardUserList
        setAllDashUser(allUsers);
        setDashUserlist(allUsers);
      }
    })
  }

  const changeUserType = (type) => {
    setUserType(type)
    navigate('/users/' + userCat + '/' + type)
    return (userCat === 'App') ? filter_UserData(type) : (userCat === 'Dashboard') ? filter_DashboardUser(type) : filter_AdminUser(type)
  }

  const filter_AdminUser = (role) => {
  }

  const filter_DashboardUser = (role) => {
    if (role === 'All') {
      setDashUserlist(alldashUser);
      return;
    }

    let filterd_data = alldashUser.filter((item) => {
      return item?.role?.toUpperCase() === role?.toUpperCase()
    })
    setDashUserlist(filterd_data)
  }

  const filter_UserData = (role) => {
    if (role === 'All' || role === 'DPO') {
      allUsers.forEach((obj, i) => {
        obj.index = i + 1
      });
      setUserList(allUsers);
      return;
    }
    else {
      fetchAppWorkorList(role)
    }
  }


  const openBulkModal = () => {
    setBulkModalShow(true)
  }
  const closeBulkModel = () => {
    setBulkModalShow(false)
  }

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

  // const addUserModal = () => {
  //   setShowmodal(true)
  // }

  const handleEditUser = (user) => {
    setEditMode(true);
    setEditData(user);


    handleShow();

  }

  const handleEditDashUser = (user) => {
    setEditMode(true);
    setEditData(user);
    handleDashboardShow();
  }

  const handleFilterModalClose = () => {
    setFilterModal(false)
  }

  return (
    <div className='container-fluid'>

      {props.isLoading &&
        <div className="loading">Loading&#8230;</div>
      }

      {userCat === '' ?

        <>
          <header>
            <div className='d-flex justify-content-between '>
              <span className='fs-5 px-2 font-primary'>{t('select_user_type')}</span>
            </div>
          </header>

          <div className="row">
            <div className="col-md-3 col-sm-4" onClick={() => selectCat('App')}>
              <div className="card text-dark bg-light cursor-point">
                <div className=" d-flex card-body Card_css pb-0">
                  <img src={logo} className="rounded float-start" alt="..." style={{ width: '70px' }} />
                  <h5 className="card-title mt-3">{t('app_user')}</h5>

                </div>
                <div className="Card_css_no card-text">{appUserCount ? appUserCount : 0}</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4" onClick={() => selectCat('Dashboard')}>
              <div className="card text-dark bg-light cursor-point">
                <div className=" d-flex card-body Card_css pb-0">
                  <img src={dashboard_logo} className="rounded float-start" alt="..." style={{ width: '70px' }} />
                  <h5 className="card-title mt-3">{t('dashboard_user')}</h5>

                </div>
                <div className="Card_css_no card-text">{dashboardUserCount ? dashboardUserCount : 0}</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4" onClick={() => selectCat('Admin')}>
              <div className="card text-dark bg-light cursor-point">
                <div className=" d-flex card-body Card_css pb-0">
                  <img src={admin_logo} className="rounded float-start" alt="..." style={{ width: '70px' }} />
                  <h5 className="card-title mt-3">{t('admin_user')}</h5>

                </div>
                <div className="Card_css_no card-text">0</div>
              </div>
            </div>
          </div>
        </>

        :
        <>

          <header>
            <div className='d-flex justify-content-between align-items-center '>
              <div className='d-flex gap-1'>

                <i className="fa fa-arrow-circle-left back_btn fs-3"
                  onClick={() => {
                    setUserCat('')
                    navigate('/users')
                  }}></i>

                <h5>
                  {userCat === 'App' ? t('app_user') : userCat === 'Dashboard' ? t('dashboard_user') : t('admin_user')}
                </h5>
              </div>



              <span className='d-flex gap-3 align-items-center'>
                <button className='btn btn-light filter-btn' onClick={() => setFilterModal(true)}  >
                  Filter   <img src={editIcon} height={20} />
                </button>


                {userCat === 'App' &&

                  <select className="custom-select" aria-label="Default select example" value={userType} onChange={(e) => changeUserType(e.target.value)}
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    <option disabled>{t('select_user_type')}</option>
                    {/* <option value="All">{t('all')}</option> */}
                    <option value="DPO">{t('dpo')}</option>
                    <option value="CDPO">{t('cdpo')}</option>
                    <option value="MS">{t('ms')}</option>
                    <option value="AWW">{t('aww')}</option>
                  </select>

                }

                {userCat === 'Dashboard' &&

                  <select className="custom-select" aria-label="Default select example" value={userType} onChange={(e) => changeUserType(e.target.value)}>
                    <option disabled>{t('select_user_type')}</option>
                    <option value="All">{t('all')}</option>
                    <option value="DPO">{t('dpo')}</option>
                    <option value="CDPO">{t('cdpo')}</option>
                    <option value="STATE">{t('state')}</option>
                  </select>

                }

                {userCat === 'Admin' &&

                  <Form.Select aria-label="Default select example" value={userType} onChange={(e) => changeUserType(e.target.value)}>
                    <option value="ADMIN">{t('admin')}</option>
                  </Form.Select>

                }

              </span>
            </div>
          </header>

          <div className='py-0 sub-wrapper'>
            {userCat === 'App' &&
              <CdpoTable
                userlist={userlist}
                openBulkModal={openBulkModal}
                handleShow={handleShow}
                dispatch={props.dispatch}
                toastalert={toastalert}
                role={userType.toUpperCase()}
                editUser={handleEditUser}
              />
            }

            {userCat === 'Dashboard' &&

              <DashboardUserTable
                userlist={dashuserlist}
                openBulkModal={openBulkModal}
                handleShow={handleDashboardShow}
                dispatch={props.dispatch}
                toastalert={toastalert}
                role={userType.toUpperCase()}
                editUser={handleEditDashUser}
              />
            }
            {userCat === 'Admin' &&
              <AdminTable
                userlist={alldashUser}
                dispatch={props.dispatch}
                toastalert={toastalert}
              />
            }

          </div>

          <UserModal
            editdata={editData}
            editmode={editMode}
            show={showmodal}
            userType={userType}
            handleClose={handleClose}
            allDistricts={props.allDistricts}
            dispatch={props.dispatch}
            // getmainData={fetchAppUserList}
            toastalert={toastalert}
            role={userType.toUpperCase()}
          />

          <DashboardUserModal
            editdata={editData}
            editmode={editMode}
            show={showDashboardmodal}
            userType={userType}
            handleClose={handleClose}
            allDistricts={props.allDistricts}
            dispatch={props.dispatch}
            // getmainData={fetchAppUserList}
            toastalert={toastalert}
            role={userType.toUpperCase()}
          />
          <BulkUpload bulk_show={bulkmodalshow} closeBulkModel={closeBulkModel} dispatch={props.dispatch} toastalert={toastalert} />
        </>
      }



      <FilterModalComponent
        dispatch={props.dispatch}
        allDistricts={props.allDistricts}
        allghataks={props.allghataks}
        allSectors={props.allSectors}
        filterModal={filterModal}
        handleFilterModalClose={handleFilterModalClose}
        userType={userType}
        allUsers={allUsers}
        appWorkerlist={appWorkerlist}
        setUserList={setUserList}
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

const mapStateToProps = (state) => {
  const { app_users, aww_users, app_workers, dashboard_users, admin_users, dashboard_user_count, app_user_count } = state.user;
  const { allSectors, allDistricts } = state.area;
  const { allghataks } = state.projects
  const { isLoading } = state.loading;
  return {
    app_users,
    aww_users,
    app_workers,
    dashboard_users,
    admin_users,
    app_user_count,
    dashboard_user_count,
    isLoading,
    allDistricts,
    allghataks,
    allSectors
  }
}



export default connect(mapStateToProps, null)(Users)