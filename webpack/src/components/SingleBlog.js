import React from 'react'
import { connect } from 'react-redux'
import { addLikeToBlog, getBlogs } from '../reducers/blogsReducer'
import BlogComments from './BlogComments'
import BlogCommentForm from './BlogCommentForm'
import { Divider } from 'semantic-ui-react'

class SingleBlog extends React.Component {

  incBlogLikes = (blog) => () => {
    console.log('Increase likes for blog: ', blog.title)
    //const blogs = await blogService.getAll()
    this.props.addLikeToBlog(blog)
  }

  render() {
    if (!this.props.blogs || this.props.blogs.length===0) {
      this.props.getBlogs()
      return (null)
    }

    console.log('blogs: ', this.props.blogs)
    const blog = this.props.blogs.find(blog => this.props.blogid===blog.id)

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
        {'added by '}
        {blog.user.name}
        <Divider className="ui horizontal divider">
           The intelligent part
        </Divider>
        <BlogComments comments={blog.comments} />
        <Divider className="ui horizontal divider">
           Opprotunity for You to participate below
        </Divider>
        <BlogCommentForm
          blogid={blog.id}
          blogtitle={blog.title}
        />
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
  { addLikeToBlog, getBlogs })(SingleBlog)