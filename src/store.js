import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'

const reducers = combineReducers({
    notify: notificationReducer,
    users: userReducer,
    blogs: blogsReducer,
    loginUser: loginReducer })

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store