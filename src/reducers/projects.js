const initialState = {

    allprojects: [],
    allghataks: []
}


export default function projects(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case ("GET_PROJECTS"):
            return {
                ...state,
                allprojects: payload
            }

        case ("UPDATE_PROJECTS"):
            return {
                ...state,
                allprojects: state.allprojects.map((item) => item._id === payload.id ? { ...item, project_name: payload.project_name, project_code: payload.project_code } : item)
            }


        case ("GET_GHATAKS"):
            return {
                ...state,
                allghataks: payload
            }


        case ("UPDATE_GHATAKS"):
            return {
                ...state,
                allghataks: state.allghataks.map((item) =>
                    item.id === payload.ghatak_id ? { ...item, ghatak_name: { en: payload.ghatak_name_eng, gu: payload.ghatak_name_guj } } : item)
            }

        case ("CREATE_GHATAK"):
            return {
                ...state,
                allghataks: [...state.allghataks , payload]
            }


        default:
            return {
                ...state
            }
    }
}