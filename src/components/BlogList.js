import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({blogs, loginUser, currentLogin, onIncLikes, onDeleteBlog}) => {
  return (
    blogs.map(blog => 
      <Blog 
        key={blog.id} 
        id={blog.id}
        currentLogin={currentLogin}
        title={blog.title} 
        author={blog.author}
        url={blog.url}
        likes = {blog.likes}
        user={blog.user}
        loginUser={currentLogin}
        onIncLikes={onIncLikes(blog)}
        onDeleteBlog={onDeleteBlog(blog)}
      />
    )
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  currentLogin: PropTypes.object.isRequired,
  onIncLikes:PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    currentLogin: state.loginUser
  }
}

export default connect(
  mapStateToProps,
  null)(BlogList)