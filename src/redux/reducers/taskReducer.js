const TASK_CLICKED = 'TASK_CLICKED'
const SET_TASKS = 'SET_TASKS'
const REMOVE_TASK_ITEM_AC = 'REMOVE_TASK_ITEM_AC'
const ADD_NEW_TASKS_ITEM = 'ADD_NEW_TASKS_ITEM'

const initialState = {
    tasks: [],
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASK_CLICKED:
            return {
                ...state,
                // clicked: taskClicked
            }
        case SET_TASKS:
            return {
                ...state,
                tasks: action.data,
            }
        case REMOVE_TASK_ITEM_AC:
            return {
                ...state,
                tasks: action.data,
            }
        case ADD_NEW_TASKS_ITEM:
                return {
                    ...state,
                    tasks: [...state.tasks, action.newTaskItem]
                }
        default:
            return state
    }
}

export default taskReducer
