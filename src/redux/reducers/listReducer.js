const SET_LISTS = 'SET_LISTS'
const SET_COLORS = 'SET_COLORS'
const ADD_LIST_ITEM = 'ADD_LIST_ITEM'
const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM'

const initialState = {
    lists: [],
    colors: [],
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                lists: action.data,
            }
        case SET_COLORS:
            return {
                ...state,
                colors: action.colors,
            }
        case ADD_LIST_ITEM:
            return {
                ...state,
                lists: [...state.lists, action.listItem],
            }
        case DELETE_LIST_ITEM: {
            return {
                ...state,
                lists: action.data,
            }
        }
        default:
            return state
    }
}

export default listReducer
