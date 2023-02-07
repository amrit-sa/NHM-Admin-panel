const initialState = {

    allDistricts: [],
    allSectors: []
}


export default function area(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case ("GET_DISTRICTS"):
            return {
                ...state,
                allDistricts: payload
            }


        case ("UPDATE_DISTRICTS"):
            return {
                ...state,
                allDistricts: state.allDistricts.map((item) =>
                    item._id === payload.district_id ? { ...item, district: { en: payload.district_name_eng, gu: payload.district_name_guj } } : item

                )
            }



        case ("ADD_SECTOR"):
            return {
                ...state,
                allSectors: [...state.allSectors, payload]
            }

        case ("GET_SECTORS"):
            return {
                ...state,
                allSectors: payload
            }

        case ("UPDATE_SECTORS"):
            return {
                ...state,
                allSectors: state.allSectors.map((item) =>
                    item.id === payload.sector_id ? { ...item, sector_name: { en: payload.sector_name_eng, gu: payload.sector_name_guj }  } : item

                )
            }



        default:
            return {
                ...state
            }
    }
}