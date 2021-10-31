import { combineReducers } from 'redux'

import taskReducer from './reducers/taskReducer'
import listReducer from './reducers/listReducer'

const rootReducer = combineReducers({
    taskReducer,
    listReducer,
})

export default rootReducer
