const SET_LISTS = 'SET_LISTS'
const SET_COLORS = 'SET_COLORS'
const ADD_LIST_ITEM = 'ADD_LIST_ITEM'
const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM'
const SET_TOGGLE_ITEM = 'SET_TOGGLE_ITEM'
const ON_EDIT_TITLE = 'ON_EDIT_TITLE'

const initialState = {
    lists: [],
    colors: []
}

const listReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_LISTS:
            return {
                ...state,
                lists: action.data
            }
        case SET_COLORS:
            return {
                ...state,
                colors: action.colors
            }
        case ADD_LIST_ITEM:
            return {
                ...state,
                lists: [...state.lists, action.listItem]
            }
        case DELETE_LIST_ITEM: {
            return {
                ...state,
                lists: action.data
            }
        }
        case SET_TOGGLE_ITEM: {
            const newLists = JSON.parse(JSON.stringify(state.lists))

            const index = newLists.findIndex(elem => elem.id === payload.id)

            newLists[index] = payload
            return {
                ...state,
                lists: newLists
            }
        }
        case ON_EDIT_TITLE:
            const editTitle = state.lists.map(list => {
                if (list.id === payload) {
                    list.name = action.newTitle
                }
                return list
            })

            return {
                ...state,
                lists: editTitle
            }

        default:
            return state
    }
}

export default listReducer
