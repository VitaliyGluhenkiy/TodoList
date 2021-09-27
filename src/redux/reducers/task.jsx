const ADD_TASK = 'ADD_TASK'

const initialState = {
    taskItems : {}
}

const taskReducer = (state = initialState , action) => {
    switch(action.type) {
        case ADD_TASK:
            return {
                ...state,

            }
        default:
            return state
    }
}

export default taskReducer