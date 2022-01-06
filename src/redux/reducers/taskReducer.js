const SET_TASKS = 'SET_TASKS'
const REMOVE_TASK_ITEM_AC = 'REMOVE_TASK_ITEM_AC'
const ADD_NEW_TASKS_ITEM = 'ADD_NEW_TASKS_ITEM'
const SET_TASKS_LIST_DG = 'SET_TASKS_LIST_DG'

const initialState = {
    tasks: []
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.data
            }
        case REMOVE_TASK_ITEM_AC:
            return {
                ...state,
                tasks: action.data
            }
        case ADD_NEW_TASKS_ITEM:
            return {
                ...state,
                tasks: [...state.tasks, action.newTaskItem]
            }
        case SET_TASKS_LIST_DG:
            return {
                ...state,
                tasks: action.newTasksDG
            }
        default:
            return state
    }
}

export default taskReducer
