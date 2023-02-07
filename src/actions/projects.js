
import APIService from '../services/main'

export const getProjects = () => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.get('get-project').then(
      (response) => {
        dispatch({
          type: "GET_PROJECTS",
          payload: response.ProjectList
        });
        dispatch({ type: "LOADING_FAILED" })
        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  };
  

  export const updateProject = (payload) => (dispatch) => {
    dispatch({ type: "LOADING_SUCCESS" })
    return APIService.post('update-project', payload).then(
      (response) => {
        dispatch({ type: "LOADING_FAILED" })

        dispatch({
          type: "UPDATE_PROJECTS",
          payload: payload
        });

        return response;
      }).catch(() => {
        dispatch({ type: "LOADING_FAILED" })
      });
  
  };



  
export const getGhataks = () => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.get('ghatak-list').then(
    (response) => {
      dispatch({
        type: "GET_GHATAKS",
        payload: response.response
      });
      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });
};

export const createGhatak = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('create-ghatak', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      dispatch({
        type: "CREATE_GHATAK",
        payload: payload
      });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });

};

export const updateGhatak = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('update-ghatak', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      dispatch({
        type: "UPDATE_GHATAKS",
        payload: payload
      });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });

};