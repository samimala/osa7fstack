import React from 'react'
import { connect } from 'react-redux'
import { showInfoNotification, showErrorNotification, hideNotification} from '../reducers/notificationReducer'


const Notification = (props) => {
  if (props===null) {
    return null
  }
  console.log('Writing message', props)
  return (<div className={(props.kind==='Info')?"notification":
    (props.kind==='Error')?"error":""}>{props.text}</div>)
}

const mapStateToProps = (state) => (
  {
    text: state.text,
    kind: state.kind
  }
)

export default connect(
  mapStateToProps,
  { showInfoNotification, 
    showErrorNotification, 
    hideNotification})(Notification)