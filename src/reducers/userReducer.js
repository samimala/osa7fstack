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

export const showUsers = (users) => {
  console.log('ShowUSers gets', users)
  return {
    type: 'STORE_USERS',
    userlist: users
  }
}

export default userReducer



