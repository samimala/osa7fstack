const loginReducer = (state={}, action) => {
  switch (action.type) {
  case 'LOGIN':
    console.log('Loginuser saved as: ', action.user)
    return action.user
  case 'LOGOUT':
    return null
  default:
  }
  return state
}

export const loginUser = (user) => {
  return {
    type: 'LOGIN',
    user: user
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer