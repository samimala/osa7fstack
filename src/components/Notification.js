import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
  if (props===null) {
    return null
  }
  console.log('Writing message', props)
  return (<div className={(props.kind==='Info')?"notification":
    (props.kind==='Error')?"error":""}>{props.text}</div>)
}

const mapStateToProps = (state) => {
  return {
    text: state.notify.text,
    kind: state.notify.kind
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)