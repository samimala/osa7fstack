
const userReducer = (state=[], action) => {
  switch (action.type) {
  case 'SHOW_USERS':
    return action.userlist;
  default:
  }
  return state
}

export const showUsers = (users) => {
  console.log('ShowUSers gets', users)
  return {
    type: 'SHOW_USERS',
    userlist: users
  }
}
export default userReducer



