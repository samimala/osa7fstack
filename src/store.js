import { createStore, combineReducers } from 'redux'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
    notify: notificationReducer,
    users: userReducer })

const store = createStore(reducers)

export default store