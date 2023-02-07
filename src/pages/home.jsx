import React from "react";
import { useNavigate } from 'react-router-dom'
import '../home.css'
import Accordion from 'react-bootstrap/Accordion';
import { useState } from "react";
import { useEffect } from "react";
import { getUserCount } from '../actions/user';
import { connect } from 'react-redux'

const Home = (props) => {
  // const [isLoading , setisLoading] = useState(true);
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState({
    "dashboardUserCount": 0,
    "appUserCount": 0,
    "msCount": 0,
    "cdpoCount": 0,
    "dpoCount": 0,
    "awwCount":0,
    "stateUserCount": 0
  })
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setisLoading(false);
  //   },2000)
  // },[])


  const getUsersCount = () => {
    props.dispatch(getUserCount()).then((response) => {
      if (response.code === 200 && response.status === 'success') {
        const dashbaordUserCount = (response?.dpoCount ? response?.dpoCount : 0) + (response?.cdpoCount ? response?.cdpoCount : 0) + (response?.stateUserCount ? response?.stateUserCount : 0)
        const appUserCount = (response?.dpoCount ? response?.dpoCount : 0) + (response?.cdpoCount ? response?.cdpoCount : 0) + (response?.msCount ? response?.msCount : 0) + + (response?.awwCount ? response?.awwCount : 0)

        setUsersCount({
          "dashboardUserCount": dashbaordUserCount,
          "appUserCount": appUserCount,
          "msCount": response?.msCount ? response?.msCount : 0,
          "cdpoCount": response?.cdpoCount ? response?.cdpoCount : 0,
          "dpoCount": response?.dpoCount ? response?.dpoCount : 0,
          "awwCount": response?.awwCount ? response?.awwCount : 0,
          "stateUserCount": response?.stateUserCount ? response?.stateUserCount : 0
        })
      }
    })
  }

  useEffect(() => {

    getUsersCount()

  }, [])

  const handleRedirect = (usertype) => {
    navigate('/users/' + usertype)
  }
  return (

    <div className='container-fluid'>

      {/* {isLoading &&
        <div className="loading">Loading&#8230;</div>
      } */}

      <header>
        <span className='heading'></span>
      </header>

      {/* <div className="row">
        <div className="col-sm-3" onClick={() => handleRedirect('CDPO')}>
          <div className="card text-dark bg-light cursor-point">
              <div className=" d-flex card-body Card_css">
                <img src="images/home_iconb.png" className="rounded float-start"  alt="..." style={{ width: '70px' }}/>
                <h5 className="card-title">CDPO</h5>
              
              </div>
            <div className="Card_css_no card-text" >10</div>
          </div>
        </div>
        <div className="col-sm-3" onClick={() => handleRedirect('MS')}>
          <div className="card text-dark bg-light cursor-point">
            <div className=" d-flex card-body Card_css">
              <img src="images/home_icong.png" className="rounded float-start" alt="..." style={{ width: '70px' }} />
              <h5 className="card-title">MS</h5>
             
            </div>
            <div className="Card_css_no card-text">55</div>
          </div>
        </div>
        <div className="col-sm-3" onClick={() => handleRedirect('Admin')}>
          <div className="card text-dark bg-light cursor-point">
            <div className=" d-flex card-body Card_css">
              <img src="images/dashboard_icon.png" className="rounded float-start" alt="..." style={{ width: '70px' }} />
              <h5 className="card-title">DASHBOARD USER</h5>
              
            </div>
            <div className="Card_css_no card-text">130</div>
          </div>
        </div>
        <div className="col-sm-3" onClick={() => handleRedirect('Admin')}>
          <div className="card text-dark bg-light cursor-point">
            <div className=" d-flex card-body Card_css">
              <img src="images/home_icon5.png" className="rounded float-start" alt="..." style={{ width: '70px' }} />
              <h5 className="card-title">ADMIN</h5>
             
            </div>
            <div className="Card_css_no card-text">130</div>
          </div>
        </div>
      </div> */}


      <>
        <div className="container-fluid chart-wrapper">
          <div className="row text-center">


            <div className="col-lg-7 col-md-12 p-2">
              <div className="diagram-wrapper">

                <div className=" d-flex card-body Card_css">
                  <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '45px' }} />
                  <h6 className="card-title level-1 rectangle">App Users/workers<span>{` (${usersCount.appUserCount})`}</span></h6>

                </div>

                <ol className="level-2-wrapper">
                  <li>
                    <div className=" d-flex card-body Card_css ">
                      <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '40px' }} />
                      <h6 className="card-title level-2 rectangle">THV<span>{` (${usersCount.cdpoCount})`}</span></h6>
                    </div>
                    </li>
                    <li>
                    <div className=" d-flex card-body Card_css ">
                      <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '40px' }} />
                      <h6 className="card-title level-2 rectangle">FHS<span>{` (${usersCount.cdpoCount})`}</span></h6>
                    </div>
                  </li>
                  <li>
                    <div className=" d-flex card-body Card_css ">
                      <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '40px' }} />
                      <h6 className="card-title level-2 rectangle">ANM<span>{` (${usersCount.msCount})`}</span></h6>
                    </div>
                    </li>
                    <li>
                    <div className=" d-flex card-body Card_css ">
                      <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '40px' }} />
                      <h6 className="card-title level-2 rectangle">ASHA-F<span>{` (${usersCount.awwCount})`}</span></h6>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="col-lg-5 col-md-12  p-2">
              <div className="diagram-wrapper">

                <div className=" d-flex card-body Card_css ">
                  <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '45px' }} />
                  <h6 className="level-1 rectangle">Dashboard Users<span>{` (${usersCount.dashboardUserCount})`}</span></h6>
                </div>
                <ol className="level-2-wrapper level-b2-wrapper">
                  <li>
                    <div className=" d-flex card-body Card_css ">
                      <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '40px' }} />
                      <h6 className="card-title level-2 rectangle">THV<span>{` (${usersCount.cdpoCount})`}</span></h6>
                    </div>
                  </li>
                  <li>
                    <div className=" d-flex card-body Card_css ">
                      <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '40px' }} />
                      <h6 className="card-title level-2 rectangle">FHS<span>{` (${usersCount.dpoCount})`}</span></h6>
                    </div>
                  </li>
                  <li>
                    <div className=" d-flex card-body Card_css ">
                      <img src="images/home_iconb.png" className="rounded float-start" alt="..." style={{ width: '40px' }} />
                      <h6 className="card-title level-2 rectangle">ANM<span>{` (${usersCount.stateUserCount})`}</span></h6>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>

        </div>





        <div className="instruction-wrapper mb-2 pb-4">
          <h5>

            Admin panel has been developed to manage change in login and other credentials like name and mobile numebrs of App users and State dashbaord users. <br></br>
            There are three type of users.
          </h5>
          <ul>

            <li>
              <span className="text-danger font-primary">App Users:</span> Who uses Sahyog App Mobile application.
              <ul>
                <li>On the top right select box, we can choose type of user we want to see.</li>
                <li>We can add a new CDPO or use bulk upload to add lots of CDPO at once.</li>
                <li>On clicking the name of the user, we can see all CDPO under a DPO, all MS under a CDPO and all AWW under a Mukhya Sevika.</li>
                <li>We can also make the CDPO active or inactive using a click.</li>
              </ul>
            </li>

            <li>
              <span className="text-danger font-primary">Dashboard Users</span>Who uses Sahyog App State Dashboard application.
            </li>

            <li>
              <span className="text-danger font-primary">Admin Pane Users:</span> Who uses this Sahyog App Admin panel application.
            </li>
          </ul>



          <h5>On the left panel of home page, we can see six section.</h5>
          <ol style={{listStyle:"auto"}} className="dashboard-instruct-ol">
            <li>
              <span className="text-success font-primary">Dashboard:</span>
              <span className="mx-1">
                - Here we can see number of different type of users of three type of application – Sahyog App, Sahyog App State dashboard and Admin panel
              </span>
            </li>

            <li>
              <span className="text-success font-primary">Users:</span>

              <span>
                - Here we can see the name, mobile number and district of CDPO and Mukhya Sevika who are using Sahyog App. Their log in status (active & Inactive) can also be seen from here. Reset and change of mobile number can also be done from here. By clicking the name of CDPO, we can see the name of sectors and Mukya Sevika added along with their mobile number. In same way, by clicking the name of Mukhya Sevika, we can see the name of AWW and her mobile number. Users can be searched from either name or mobile number.
              </span>

            </li>

            <li>
              <span className="text-success font-primary">Project:</span>

              <span>
                - Here we can view all running projects and update the details of the project.
              </span>

            </li>

            <li>
              <span className="text-success font-primary">Sector:</span>

              <span>
                - Here we can view all sectors and update the details of the sector.
              </span>

            </li>

            <li>
              <span className="text-success font-primary">District:</span>

              <span>
                - Here we can view all districts. We can add a new District and also can update the details of the district.
              </span>

            </li>


            <li>
              <span className="text-success font-primary">Visits:</span>

              <span>
                 - Here we can see the checklists and questions added in the checklists. We can also edit the questions from here. Following features are given here.
              </span>


              <ul>
                <li>On first page it shows all types visits/checklists visible in the mobile app.</li>
              
                <li>We can create a new Visit from here and also can update the visit details.</li>
                <li>On clicking view button, it shows all visit categories under that particular visit. Here we can add and update a visit category.</li>
                <li>On clicking info or i button, it shows all questions related to that visit category. We can view, create new question and update the question from here.</li>
                <li>On clicking view button, it shows all labels under that visit category. We can create a new label and add questions inside that level, which will then visible in mobile application.</li>
                <li>On selecting one level, it shows all available survey questions which are visible on mobile app used by Mukhya Sevika and CDPO.</li>
                <li>Before adding / deleting any questions or viist/checklists, it has to be first connected to App / State Dashboard developer, because it may disturb the architecture of Sahyog App and State dashboard.</li>
              
              </ul>
            </li>

          </ol>


          
            <h6>
            Currently as per discusion with ICDS Directorate, three people has given right to access Admin panel – Director ICDS, JPC-SNM and Deputy Director Alive & Thrive. It should not be given right to more number of people, because any mistakes in Admin panel may disturb the App and Dashboard. 
            <br></br>So, usage of Admin panel is reastricted to very few people.
            </h6>
         
         
        </div>





        {/* <div className="instruction-wrapper">

          <h5>How to use the Admin Panel ?</h5>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Users</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>{'We have 3 type of users.'}</li>
                  <li><span className="fw-bold">{'App Users:'}</span><span> Who uses Mobile application.</span></li>

                  <ul>
                    <li>{'On the top right select box, we can choose type of user we want to see.'}</li>
                    <li>{'We can add a new CDPO or use bulk upload to add lots of CDPO at once.'}</li>
                    <li>{'On clicking the name of the user, we can see the all MS under a CDPO and all AWW under a MS.'}</li>
                    <li>{'We can also make the CDPO active or inactive using a click.'}</li>
                  </ul>
                  <li><span className="fw-bold">{'Dashboard Users:'}</span><span> Who uses Dashboard application.</span></li>
                  <li><span className="fw-bold">{'Admin Users:'}</span><span> Who uses this Admin application.</span></li>

                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Projects</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>{'Here we can view all running projects and update the details of the project.'}</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Sectors</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>{'Here we can view all sectors and update the details of the sector.'}</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>


            <Accordion.Item eventKey="3">
              <Accordion.Header>Districts</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>{'Here we can view all districts.'}</li>
                  <li>{'We can add a new District and also can update the details of the district.'}</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Visits</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>{'On first page it shows all types visits visible in the mobile app.'}</li>
                  <li>{'We can create a new Visit from here and also can update the visit details.'}</li>

                  <li>{'On clicking view button, it shows all visit categories under that particular visit. Here we can add and update a visit category.'}</li>
                  <li>{'On clicking info or i button, it shows all questions related to that visit category. We can view, create new question and update the question from here.'}</li>
                  <li>{'On clicking view button, it shows all labels under that visit category. We can create a new label and add questions inside that label, which will then visible in mobile application.'}</li>
                  <li>{'On selecting one label, it shows all available survey questions which are visible on mobile app used by MS.'}</li>

                </ul>
              </Accordion.Body>
            </Accordion.Item>


          </Accordion>
        </div> */}

      </>


    </div>

  );

}



const mapStateToProps = (state) => {
  const { app_users, dashboard_users, admin_users, dashboard_user_count, app_user_count } = state.user;
  const { allDistricts } = state.area;
  const { isLoading } = state.loading;
  return {
    app_users,
    dashboard_users,
    admin_users,
    app_user_count,
    dashboard_user_count,
    isLoading,
    allDistricts
  }
}


export default connect(mapStateToProps, null)(Home)
