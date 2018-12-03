import { createStore, combineReducers } from 'redux'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
    notify: notificationReducer,
    userdata: userReducer })

const store = createStore(reducers)

export default store