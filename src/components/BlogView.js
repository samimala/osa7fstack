import React from 'react'
import { connect } from 'react-redux'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import BlogList from './BlogList'
import blogService from '../services/blogs'
import { addLikeToBlog, deleteBlog } from '../reducers/blogsReducer'

class BlogView extends React.Component {

  incBlogLikes = () =>(blog) => async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.token
    }
    console.log('Increase likes for blog: ', blog.title)
    const response = await blogService.update(updatedBlog)  
    //const blogs = await blogService.getAll()
    //console.log('Updating blogs to ', blogs)
    this.props.addLikeToBlog(blog.id)
  }

  deleteBlog = () => (blog) => async () => {
    console.log('Delete blog: ', blog.title)
    if (!window.confirm('Really want to get rid of: ' + blog.title)) {
      return
    }
    try {
      const response = await blogService.deleteBlog(blog)  
    }
    catch(exception) {
      window.alert('Could not delete blog: ' + blog.title)
    }
    //const blogs = await blogService.getAll()
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
          onIncLikes={this.incBlogLikes()}
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