import APIService from '../services/main'



export const getUserCount = () => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.get('user-count').then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      dispatch({
        type:"SET_USERS_COUNT",
        payload:response
      })


      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });
};


///////////////////////////    APP USER RELATED API    /////////////
export const getAllUsers = () => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.get('get-app-user').then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })

        dispatch({
          type:"LOAD_APP_USERS",
          payload:response.getUser
        })

        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };
  

  export const addUser = (payload) => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    let {district_name} = payload; 
    return APIService.post('add-app-cdpo',payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })

        response.addedUser['district_name'] = district_name
        
        dispatch({
          type:"ADD_CDPO",
          payload:response.addedUser
        })

        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };

  
  export const updataUser = (payload) => (dispatch) => {
    dispatch({ type: "UPDATE_USER" })
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.post('update-app-user',payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })


        dispatch({
          type:"UPDATE_APP_USERS",
          payload:payload
        })


        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };



  export const bulkUploadCDPO = (payload) => (dispatch) => {
    dispatch({ type: "ADD_BULK_CDPO" })
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.post('user',payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })
        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };


  export const getAWWUsers = () => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.get('get-aww').then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })

        dispatch({
          type:"LOAD_AWW_USERS",
          payload:response.getWorker
        })

        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };



  //////////////////////////////        DASHBOARD USERS RELATED API START      /////////////////


  export const getDashboardUsers = () => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.get('getAll-dashboard-user').then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })

        dispatch({
          type:"LOAD_DASHBOARD_USERS",
          payload:response.DashboardUserList
        })

        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };



  
  export const addDashboardUser = (payload) => (dispatch) => {
    dispatch({ type: "ADD_USER" })
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.post('add-dashbord-user',payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })
        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };
  




  export const resetUser = (payload) => (dispatch) => {
    dispatch({ type: "RESET_CDPO_MOBILE" })
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.post('delete-user-token',payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })
        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };
  
  export const getUserDetails  = (payload) => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.post('get-mapped-user',payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })
        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };

  

  export const addNewAdmin  = (payload) => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.post('create-admin-panel-user',payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })
        return response;
      }).catch((err) => {
        dispatch({ type: "LOADING_FAILED" })
        return err;
      });
  };


  

  export const resetPassword  = (payload) => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.post('admin-password-reset',payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })
        console.log('resp users', response)

        return response;
      }).catch((err) => {
        dispatch({ type: "LOADING_FAILED" })
        return err.response.data;
      });
  };

  export const logout   = (adminData) => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.get('admin-panel-logout').then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })

        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };