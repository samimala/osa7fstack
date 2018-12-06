import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { addLikeToBlog } from '../reducers/blogsReducer'



class SingleBlog extends React.Component {
  constructor(props) {
    super(props)
  }

  incBlogLikes = (blog) => async () => {
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
      
  render() {    
    const blog = this.props.blogs.find(blog=>blog.id===this.props.blogid)

    console.log('Single blog', blog)
    return(
      <div>
         <h1>{blog.title}</h1>
         <a href={blog.url}>{blog.url}</a> 
         <div>
           {blog.likes} 
           {' likes '}
           <button onClick={this.incBlogLikes(blog)}>like</button>
         </div>
           {"added by "}
           {blog.user.name}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect (
  mapStateToProps,
  {addLikeToBlog})(SingleBlog)