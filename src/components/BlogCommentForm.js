import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { addCommentToBlog } from '../reducers/blogsReducer'
import { showInfoNotification, hideNotification } from '../reducers/notificationReducer'
import { Form } from 'semantic-ui-react'

class BlogCommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        comment: ''
    }
  }

  updateCommentState = (event) => {
    event.preventDefault()
    this.setState({comment: event.target.value})
  }

  addComment = async (event) => {
    event.preventDefault()
    console.log('Sending new comment:', this.state)
    const response = await blogService.addComment(this.props.blogid,this.state)
    console.log('Response from adding comment', response)
    this.props.addCommentToBlog({blogid: this.props.blogid, comment: this.state.comment})
    this.props.showInfoNotification("added comment '" + this.state.comment + "' to " + this.props.blogtitle)
    setTimeout(()=> this.props.hideNotification(), 5000)
    this.setState({comment: ''})
  }

  render() {
    return(
      <div>
        <Form onSubmit={this.addComment}>
          <Form.Input
            type="text" 
            name="comment" 
            value={this.state.comment}
            onChange={this.updateCommentState} />
          <Form.Button type="submit" className="ui fade animated button" role="button"> 
            <div className="visible content">Add comment</div>
            <div className="hidden content">Add comment - are You really sure?</div>
          </Form.Button>
        </Form>
      </div>
    )
  }
}

export default connect(
    null,
    { addCommentToBlog,
      showInfoNotification, 
      hideNotification })(BlogCommentForm)