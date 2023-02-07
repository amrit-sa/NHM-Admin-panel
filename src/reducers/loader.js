const initialState = {
    isLoading: false
}


export default function loading(state = initialState, action) {
    const { type } = action;
    switch (type) {
        case ("LOADING_SUCCESS"):
            return { isLoading: true }
        case ("LOADING_FAILED"):
            return { isLoading: false }
        default:
            return {
                isLoading: false
            }
    }
}