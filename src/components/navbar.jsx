import { NavLink } from 'react-router-dom'
// import Logo from '../icons/app_logo_transparent.png'
import UserIcon from '../icons/default_user.png'
// import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import profile from '../icons/basic/profile.png'
import lang from '../icons/languages.png'
import menu from '../icons/basic/menu2.png'
import ManagePasswordModal from './models/password';
import { useState } from 'react';
import { logout } from '../actions/user'
import { useTranslation } from 'react-i18next'

const API_URL = process.env.REACT_APP_API_URL;

function Navbarmain(props) {
  const { t } = useTranslation();
  const loginData = localStorage.getItem('userData');
  const adminData = JSON.parse(loginData);
  
  const Navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const handleToggle = () => {
    document.getElementById('drop-wrapper').classList.toggle('show')
    document.getElementById('sub-menu').classList.toggle('show')
    // document.getElementsById('dropdown-basic').classlist.toggle('show')
  }

  const handleChangePass = (e) => {
    e.preventDefault()
    setModalShow(true);
  }
  const handleClose = () => {
    setModalShow(false);
  }

  const throwOut = (e) => {
    e.preventDefault();
    const loginD = localStorage.getItem('userData');
    const adminData = JSON.parse(loginD);
    console.log(adminData, 'admindata')
    props.dispatch(logout(adminData)).then((resp) => {
      props.toastalert('success', 'Successfully Logout')
      localStorage.clear();
      Navigate("/login")
    })

    // axios.get(API_URL + 'logout').then((response) => {


    // })
    // localStorage.removeItem('FHI_admin_id');
    // sessionStorage.removeItem('FHI_admin_id');

  }

  const handleToggleSidebar = () => {
    document.getElementById('sidebar-wrapper').classList.toggle('sidebar-expanded')
    document.getElementById('sidebar-wrapper').classList.toggle('sidebar-collapse')
    // document.getElementsById('dropdown-basic').classlist.toggle('show')

    document.getElementById('primary-logo').classList.toggle('d-none')
    document.getElementById('secondary-logo').classList.toggle('d-none')

    document.getElementById('hamburger').classList.toggle('rotated')

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light py-2" >
        <div className="container-fluid ">

          {/* <i className='fa fa-bars toggle-bar-icon' aria-hidden="true" onClick={handleToggleSidebar}  ></i> */}
          <img src={menu} width={25} onClick={handleToggleSidebar} id="hamburger" className=" hamburger cursor-point" />
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
          {/* <ul className="navbar-nav p-0">

            <li className="nav-item">
              <NavLink to="/home" className="p-0">
                <img src={Logo} className="rounded float-start" alt="..." style={{ width: "4rem" }} />
              </NavLink>
            </li>
          </ul> */}



          {/* </div> */}




          <div className="d-flex gap-2">

          <Dropdown>
            <Dropdown.Toggle variant="light" className='profile-icon d-flex align-items-center'>
              {/* <img src={UserIcon} alt="Download" className="dropdown-toggle rounded float-end " width={20} /> */}
              {/* <i className='fa fa-user'></i> */}
              <img src={profile} width="30" />
              <span className='d-flex text-secondary gap-2'>

              <span className='fs-6 mx-2'>{adminData?.name}</span>
              {/* <span className='fs-6'>{adminData.role}</span> */}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* <Dropdown.Item href="#">
          <NavLink to="/" data-rr-ui-dropdown-item="" className="dropdown-item">
            Profile
          </NavLink>
        </Dropdown.Item> */}

              <Dropdown.Item href="#">
                <span onClick={throwOut} 
                  className=" d-flex align-items-center gap-3 text-danger">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span>{t('logout')}</span>
                  </span>

                
              </Dropdown.Item>
              <Dropdown.Item >

                <div className=" d-flex align-items-center gap-3"
                  onClick={handleChangePass}
                >
                  <i class="fa fa-key" aria-hidden="true"></i>
                  <span>{t('change_password')}</span>


                </div>


              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>



          <Dropdown>
            <Dropdown.Toggle variant="light" className='profile-icon d-flex'>
              <img src={lang} width="28" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
            
              <Dropdown.Item href="#">
              <div className=" d-flex align-items-center gap-3"
                  onClick={()=>props.handleChangeLang('en')}
                >
                  {/* <i class="fa fa-key" aria-hidden="true"></i> */}
                  <span>{t('english')}</span>


                </div>

                
              </Dropdown.Item>
              <Dropdown.Item >

                <div className=" d-flex align-items-center gap-3"
                  onClick={()=>props.handleChangeLang('guj')}
                  >
                  {/* <i class="fa fa-key" aria-hidden="true"></i> */}
                  <span>{t('gujrati')}</span>


                </div>


              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          </div>

          
        </div>
      </nav>


      <ManagePasswordModal modalShow={modalShow} handleClose={handleClose} dispatch={props.dispatch} toastalert={props.toastalert} />
    </>
  );
}


export default Navbarmain;