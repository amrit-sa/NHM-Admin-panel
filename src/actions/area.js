
import APIService from '../services/main'

export const addDistrict = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('add-district', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      // dispatch({
      //   type: "ADD_DISTRICTS",
      //   payload: payload
      // });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });
};


export const updateDistrict = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('update-district' ,payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })
      dispatch({
        type: "UPDATE_DISTRICTS",
        payload: payload
      });
      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });
};

export const getDistricts = () => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.get('district-list').then(
    (response) => {
      dispatch({
        type: "GET_DISTRICTS",
        payload: response.response
      });
      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });
};


//////////////////////////////////////////////

export const getSectors = () => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.get('sector-list').then(
    (response) => {
      dispatch({
        type: "GET_SECTORS",
        payload: response.response
      });
      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });
};


export const createSector = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('create-sector', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      dispatch({
        type: "ADD_SECTOR",
        payload: payload
      });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });
};


export const updateSector = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })

  return APIService.post('update-sector' , payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      dispatch({
        type: "UPDATE_SECTORS",
        payload: payload
      });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });

};

