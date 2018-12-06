//const initialState = { users: [], filter: null }

const userReducer = (state=[], action) => {
  console.log('User state', state)
  switch (action.type) {
  case 'STORE_USERS':
    return action.userlist;
//  case 'SET_USER_FILTER':
//    return { users: state.users, filter: action.id };
//  case 'RESET_USER_FILTER':
//    return { users: state.users, filter: null };
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

//export const setUserFilter = (id) => {
//  console.log('setUserFilter gets', id)
//  return {
//    type: 'SET_USER_FILTER',
//    id: id
//  }
//}

//export const resetUserFilter = () => {
//  return {
//    type: 'RESET_USER_FILTER'
//  }
//}

  
export default userReducer



