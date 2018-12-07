const notificationAtStart= { text: null }

const notificationReducer = (state=notificationAtStart, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return { text: action.text, kind: action.kind }
  case 'HIDE_NOTIFICATION':
    return { text: null }
  default:
  }

  return state
}

export const showInfoNotification = (text) => {
  console.log('Info notification called ', text)
  return {
    type: 'SHOW_NOTIFICATION',
    kind: 'Info',
    text  
  }
}

export const showErrorNotification = (text) => {
  return {
    type: 'SHOW_NOTIFICATION',
    kind: 'Error',
    text: text  
  }
}
  
  
export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default notificationReducer