import { Routes, Route, useNavigate, Navigate, NavLink } from "react-router-dom";
import Navbarmain from "./components/navbar";
import Districts from "./pages/districts";
import Home from "./pages/home";
import Projects from "./pages/projects";
import Sectors from "./pages/sectors";
import Users from "./pages/users";
import Visits from "./pages/visits";
import Sidebar from "./components/sidebar";
import Login from "./pages/login";
import Checklist from "./pages/checklist";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Suspense, useEffect } from 'react'
import Feedback from "./pages/Feedback/feedback";
import ToastAlert from "./components/ToastAlert";
import { useTranslation } from 'react-i18next'
import Ghataks from "./pages/ghataks";
import './notFoundPage.css';

// const Home = React.lazy(() => import("./pages/home"));
const loading = (
  <div className="pt-3 text-center d-flex justify-content-center align-items-center">
    <div className="loading">Loading&#8230;</div>
  </div>
)

function App(props) {
  const { i18n } = useTranslation();

  const handleChangeLang = (lang) => {

    i18n.changeLanguage(lang);

  }

  const checkLogin = () => {
    const loginD = localStorage.getItem('userData');
    if (!loginD) {
      return false;
    }
    const adminData = JSON.parse(loginD);
    if (!adminData._id) {
      return false;
    } else {
      return true;
    }
  }

  // const Navigate = useNavigate();
  let path = window.location.pathname.split('/')[1];
  if (path !== 'login' && path !== 'fdb') {



    // if (!checkLogin()
    // ) {
    //   // props.navigate('/login')
    //   window.location.href = '/login'
    // }

  }

  if (window.location.pathname === '/') {
    props.navigate('/home')
    // window.location.href = '/home'
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


  return (
    <>
      {
        (!checkLogin())
          ?
          <Routes>
            <Route path='/login' element={<Login navigate={props.navigate} />} />
            <Route path='/fdb/:id' element={<Feedback navigate={props.navigate} />} />
            <Route path='*' element={<LoginNavigation />} />
          </Routes>

          :
          <>

            <Routes>
              <Route path='/fdb/:id' element={<Feedback navigate={props.navigate} />} />
            </Routes>

            <div className="d-flex m-0" >
              <ToastAlert />
              <Sidebar />
              <div className="bg-main main-section">
                <Navbarmain dispatch={props.dispatch} toastalert={toastalert} handleChangeLang={handleChangeLang} />

                <Suspense fallback={loading}>
                  <Routes>

                  </Routes>
                </Suspense>

                <Routes>
                  <Route path='/users' element={<Users />} />
                  <Route path='/users/:cat' element={<Users />} >
                    <Route path=":type" element={<Users />} />
                  </Route>
                  <Route path='/projects' element={<Projects toastalert={toastalert} />} />
                  <Route path='/ghatak' element={<Ghataks toastalert={toastalert} />} />
                  <Route path='/districts' element={<Districts />} />
                  <Route path='/sectors' element={<Sectors />} />
                  <Route path='/visits' element={<Visits navigate={props.navigate} />} />
                  <Route path='/visits/:cat' element={<Visits navigate={props.navigate} />} />
                  <Route path='/checklists/:visit_id' element={<Checklist />} />\

                  <Route exact path='/' element={<Home />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/login' element={<HomeNavigation />} />
                  <Route path='*' element={<NotFoundPage />} />

                </Routes>




              </div>

            </div>
          </>
      }

    </>
  );
}


const withRouter = WrappedComponent => () => {
  const navigate = useNavigate();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent

      navigate={navigate}
    // etc...
    />
  );
};


const LoginNavigation = () => { return (<Navigate to="/login" replace={true} />) }

const HomeNavigation = () => { return (<Navigate to="/home" replace={true} />) }



const NotFoundPage = () => {
  useEffect(() => {
    document.querySelector('.cont_principal').className = "cont_principal cont_error_active";
  })
  return (
    <div className="cont_principal">
      <div className="cont_error">

        <h1>Oops</h1>
        <p>The Page you're looking for isn't here.</p>
        <NavLink to='/home' className="fw-bold fs-5" >Go to Home</NavLink>
      </div>
      <div className="cont_aura_1"></div>
      <div className="cont_aura_2"></div>
    </div>
  )
}


export default withRouter(connect()(App));
