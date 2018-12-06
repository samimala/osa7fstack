import React from 'react'
import { connect } from 'react-redux'
import { showInfoNotification, showErrorNotification, hideNotification} from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogsReducer'
import Togglable from './Togglable'

class CreateBlogForm extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        newBlogUrl: '',
        newBlogAuthor: '',
        newBlogTitle: '',
        createBlogVisible: false      
      }
  }
      
  handleBlogFieldChange = (event) => {
    event.preventDefault()
    const key = event.target.name
    console.log('Key is ' + key)
    this.setState( { [key] : event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()
    //this.props.createBlogForm.toggleVisibility()
    this.props.toggleVisibility()
    try {
      const newBlog = {
        url: this.state.newBlogUrl,
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor
      }
      console.log('Sending new blog:', newBlog)
      const response = await blogService.create(newBlog)
      console.log('createBlog response', response)
      console.log('Toimiiko: ',"a new blog '" + response.title + "' by " + response.author + " added")
      this.props.addBlog(newBlog)
      this.props.showInfoNotification("a new blog '" + response.title + "' by " + response.author + " added")
      setTimeout(()=> this.props.hideNotification(), 5000)
    }
    catch (exception) {
      this.props.showErrorNotification('Adding blog failed')
      setTimeout(()=> this.props.hideNotification(), 5000)
    }
  }

  render() {
    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={this.createBlog}>
        <div>
            <b>title</b>
            <input 
            type="text" 
            name="newBlogTitle" 
            value={this.state.newBlogTitle}
            onChange={this.handleBlogFieldChange}/>
        </div>
        <div>
            <b>author</b>
            <input 
            type="text" 
            name="newBlogAuthor" 
            value={this.state.newBlogAuthor}
            onChange={this.handleBlogFieldChange}/>
        </div>
        <div>
            <b>url</b>
            <input 
            type="text" 
            name="newBlogUrl" 
            value={this.state.newBlogUrl}
            onChange={this.handleBlogFieldChange}/>
        </div>
        <button type="submit">create</button> 
        </form>
    </div>
    )
  }
}


export default connect(
  null,
  { showInfoNotification, 
    showErrorNotification, 
    hideNotification,
    addBlog}
 )(CreateBlogForm)