import userService from '../services/users'
//const initialState = { users: [], filter: null }

const userReducer = (state=[], action) => {
  console.log('User state', state)
  switch (action.type) {
  case 'STORE_USERS':
    return action.userlist
  default:
  }
  return state
}

export const getUsers = () => {
  return async(dispatch) => {
    const users = await userService.getUsers()
    console.log('ShowUSers gets', users)
    dispatch ({
      type: 'STORE_USERS',
      userlist: users
    })
  }
}

export default userReducer



