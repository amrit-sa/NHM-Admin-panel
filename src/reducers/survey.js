const initialState = {

    visits: [],
    visitCategories: [],
    selected_visit: {},
    selected_visit_category: {},
    selected_visit_category_question:[],
    checklists: [],
}


export default function survey(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ('UPLOAD_VISITS'):
            return {
                ...state,
                visits: payload
            }

        case ('SELECTED_VISIT'):
            return {
                ...state,
                selected_visit: payload
            }

        case ('UPLOAD_VISIT_CATEGORIES'):
            return {
                ...state,
                visitCategories: payload
            }

        case ('SELECTED_VISIT_CATEGORY'):
            return {
                ...state,
                selected_visit_category: payload
            }

        // case ('SELECTED_VISIT_CATEGORY_QUESTIONS'):
        //     return {
        //         ...state,
        //         selected_visit_category_question: payload
        //     }

        case ("ADD_VISIT_CATEGORY"):
            let add_visit_data =
            {
                category_id: payload.Category_Id,
                sub_category_id: payload._id,
                created_date: payload.createdDate,
                sub_category_title: payload.subcategory_title.hi,
            }
            return {
                ...state,
                visitCategories: [...state.visitCategories, add_visit_data]
            }

        case ("UPDATE_VISIT_CATEGORY"):


            return {
                ...state,
                visitCategories: state.visitCategories.map(
                    (category) => category.sub_category_id === payload.sub_category_id ? { ...category, sub_category_title: payload.sub_category_name }
                        : category
                )
            }

        case ("ADD_VISIT"):
            return {
                ...state,
                visits: [...state.visits, payload]
            }
        case ("ADD_CHECKLIST"):
            let current_question_id = state.checklists[state.checklists.length - 1]["id"];
            payload.id = current_question_id + 1;
            return {
                ...state,
                checklists: [...state.checklists, payload]
            }
        case ("DELETE_VISIT"):
            let temp = state.visits
            // temp.splice(payload, 1);
            // return {
            //     ...state,
            //     visits: [...temp]
            // }
            let updated = temp.filter((obj) => {
                return obj.cid !== payload
            })
            return { ...state, visits: updated }


        case ("DELETE_CHECKLIST"):
            let tmp = state.checklists
            let updated_chklist = tmp.filter((obj) => {
                return obj.id !== payload
            })
            return { ...state, checklists: updated_chklist }


        default:
            return {
                ...state
            }
    }
}