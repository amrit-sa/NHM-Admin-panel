import APIService from '../services/main'


export const getAllVisits = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.get('get-visit-category', payload).then(
    (response) => {
      dispatch({
        type: "UPLOAD_VISITS",
        payload: response.visitCategory
      });
      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
    });
};



export const updateVisit = (payload) => (dispatch) => {
  // dispatch({ type: "ADD_VISIT" })
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('update-visit-category', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
      return Promise.reject();
    });
};

export const addVisit = (payload) => (dispatch) => {
  // dispatch({ type: "ADD_VISIT" })
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('create-visit-category', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
      return Promise.reject();
    });
};





//////     VISIT CATEGORY  OR SUB-VISIT    STARTS  ///////

export const getSubVisitData = (visit) => (dispatch) => {
  // const visit_id = visit._id;
  // const visit_title = visit.category_title.hi;
  // let selected_visit = { visit_id, visit_title };
  const payload = {
    visit_type: 'checklist',
    category_id: visit._id,
    checklist_id: ''
  }
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('get-category-mapping', payload).then(
    (response) => {
      dispatch({
        type: "UPLOAD_VISIT_CATEGORIES",
        payload: response.visitChecklist
      });
      dispatch({
        type: "SELECTED_VISIT",
        payload: visit
      });

      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch((error) => {
      dispatch({ type: "LOADING_FAILED" })
      return error;
    });
};


export const addVisitCategory = (payload) => (dispatch) => {
  // dispatch({ type: "ADD_VISIT" })
  // dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('add-visit-checklist', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })


      dispatch({
        type: "ADD_VISIT_CATEGORY",
        payload: response.results
      });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
      return Promise.reject();
    });
};


export const updateVisitCategory = (payload) => (dispatch) => {
  // dispatch({ type: "ADD_VISIT" })
  // dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('update-visit-checklist-title', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      dispatch({
        type: "UPDATE_VISIT_CATEGORY",
        payload: payload
      });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
      return Promise.reject();
    });
};


export const getChecklist = (data) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })

  const { category_id, sub_category_id, sub_category_title } = data;

  let selected_visit_category = { sub_category_id, sub_category_title }

  return APIService.get(`get-visit-checklist?category_id=${category_id}&sub_category_id=${sub_category_id}`).then(
    (response) => {


      dispatch({
        type: "SELECTED_VISIT_CATEGORY",
        payload: selected_visit_category
      });

      // dispatch({
      //   type: "SELECTED_VISIT_CATEGORY_QUESTIONS",
      //   payload: response.QuestionOptions
      // });

      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch((error) => {
      dispatch({ type: "LOADING_FAILED" })
      return error;
    });
};



//////     VISIT CATEGORY  OR SUB-VISIT    ENDS  ///////



export const addVisitCatQues = (payload) => (dispatch) => {
  // dispatch({ type: "ADD_VISIT" })
  // dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('add-visit-checklist-question-option', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      // dispatch({
      //   type: "ADD_VISIT_CATEGORY",
      //   payload: response.results
      // });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
      return Promise.reject();
    });
};





//////     QUESTIONS  STARTS      ///////


export const getQuestions = (data) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })

  // const { category_id, sub_category_id, sub_category_title } = data;

  // let selected_visit_category = { sub_category_id, sub_category_title }

  // return APIService.get(`get-visit-question?category_id=${category_id}&sub_category_id=${sub_category_id}`).then(

  const payload = {
    visit_type: 'question',
    category_id: data.Category_Id,
    checklist_id: data._id
  }
  return APIService.post('get-category-mapping', payload).then(
    (response) => {


      // dispatch({
      //   type: "SELECTED_VISIT_CATEGORY",
      //   payload: selected_visit_category
      // });

      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch((error) => {
      dispatch({ type: "LOADING_FAILED" })
      return error;
    });
};



export const getOptionsofQuestion = (data) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })

  const { category_id, sub_category_id, question_category_id } = data;

  return APIService.get(`get-visit-question-details?category_id=${category_id}&sub_category_id=${sub_category_id}&question_category_id=${question_category_id}`).then(
    (response) => {


      dispatch({ type: "LOADING_FAILED" })
      return response;
    }).catch((error) => {
      dispatch({ type: "LOADING_FAILED" })
      return error;
    });
};






export const addQuesCat = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('add-visit-question', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      // dispatch({
      //   type: "ADD_VISIT_CATEGORY",
      //   payload: response.results
      // });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
      return Promise.reject();
    });
};


export const editQuesTitle = (payload) => (dispatch) => {
  dispatch({ type: "LOADING_SUCCESS" })
  return APIService.post('update-visit-question', payload).then(
    (response) => {
      dispatch({ type: "LOADING_FAILED" })

      // dispatch({
      //   type: "ADD_VISIT_CATEGORY",
      //   payload: response.results
      // });

      return response;
    }).catch(() => {
      dispatch({ type: "LOADING_FAILED" })
      return Promise.reject();
    });
};




export const deleteVisit = (id) => (dispatch) => {
  dispatch({
    type: "DELETE_VISIT",
    payload: id
  });
};


export const addChecklist = (data) => (dispatch) => {
  dispatch({
    type: "ADD_CHECKLIST",
    payload: data
  });
};

export const deleteChecklist = (id) => (dispatch) => {
  dispatch({
    type: "DELETE_CHECKLIST",
    payload: id
  });
};

