const initialState = {
    app_users: [],
    aww_users:[],

    app_dpo :[],
    app_workers:[],
    
    dashboard_users: [],
    admin_users: [],

    app_user_count: null,
    dashboard_user_count: null,
    admin_user_count: 0,
}

export default function user(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {


        case ('SET_USERS_COUNT'):
            const dashbaordUserCount = (payload?.dpoCount ? payload?.dpoCount : 0) + (payload?.cdpoCount ? payload?.cdpoCount : 0) + (payload?.stateUserCount ? payload?.stateUserCount : 0)
            const appUserCount = (payload?.dpoCount ? payload?.dpoCount : 0) + (payload?.cdpoCount ? payload?.cdpoCount : 0) + (payload?.msCount ? payload?.msCount : 0) + + (payload?.awwCount ? payload?.awwCount : 0)

            return {
                ...state,
                app_user_count: appUserCount,
                dashboard_user_count: dashbaordUserCount
            }

        case ('LOAD_APP_USERS'):
            return {
                ...state,
                app_users: payload
            }


        case ('LOAD_AWW_USERS'):
            return {
                ...state,
                aww_users: payload,
                app_workers:payload
            }

        case ('ADD_CDPO'):
            return {
                ...state,
                app_users: [...state.app_users, payload],
                app_user_count: state.app_user_count + 1,
            }
        case ('UPDATE_APP_USERS'):
            return {
                ...state,
                app_users: state.app_users.map(
                    (person) => person._id === payload.user_id ? { ...person, Mobile: payload.mobile,  status: payload.status, Name: { ...person.Name, en: payload.eng_name , gu :payload.guj_name } }
                        : person
                )
            }
        case ('LOAD_DASHBOARD_USERS'):
            return {
                ...state,
                dashboard_users: payload
            }

        default:
            return {
                ...state
            }
    }
}