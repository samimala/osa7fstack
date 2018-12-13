import React from 'react'
import { connect } from 'react-redux'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import BlogList from './BlogList'
import { addLikeToBlog, deleteBlog } from '../reducers/blogsReducer'

class BlogView extends React.Component {


  incLikes = () => (blog) => () => {
    this.props.addLikeToBlog(blog)
  }
  deleteBlog = () => (blog) => () => {
    if (!window.confirm('Really want to get rid of: ' + blog.title)) {
      return
    }
    this.props.deleteBlog(blog)
  }

  toggleVisibility = () => {
    this.createBlogForm.toggleVisibility()
  }

  render() {
    return (
      <div>
        <h2>blogs</h2>
        <Togglable buttonLabel="Create new blog" ref={component=>this.createBlogForm=component}>
          <CreateBlogForm toggleVisibility={this.toggleVisibility} />
        </Togglable>
        <BlogList
          onIncLikes={this.incLikes()}
          onDeleteBlog={this.deleteBlog()}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { addLikeToBlog,
    deleteBlog })(BlogView)