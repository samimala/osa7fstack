import blogService from '../services/blogs'

const blogsReducer = (state=[], action) => {
  console.log('Store state', state)
  switch (action.type) {
  case 'STORE_BLOGS':
    return [ ...action.blogs ]
  case 'ADD_BLOG':
    return state.concat(action.blog)
  case 'UPDATE_BLOG':
    console.log('Addling like to id', action.blog.id)
    return state.filter(blog=>blog.id !== action.blog.id).concat([action.blog])
      .sort((a,b)=>b.likes-a.likes)
  case 'DELETE_BLOG':
    return [...state.filter(blog => blog.id !== action.blog.id)]
  case 'ADD_COMMENT':
    console.log('Comment reducer: ', action)
    return state.map(blog=>({...blog,
      comments: (blog.id!==action.id)?blog.comments:action.comments}))
  default:
  }
  return state
}

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log('SetBlogs gets', blogs)
    dispatch ({
      type: 'STORE_BLOGS',
      blogs: blogs
    })
  }
}

export const addLikeToBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes+1,
    }
    console.log('Increase likes for blog: ', updatedBlog.title)
    const result = await blogService.update(updatedBlog)
    console.log('Add likest returns: ', result)
    dispatch ({
      type: 'UPDATE_BLOG',
      blog: result
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    console.log('Delete blog: ', blog.title)
    try {
      await blogService.deleteBlog(blog)
    }
    catch(exception) {
      window.alert('Could not delete blog: ' + blog.title)
    }
    dispatch ({
      type: 'DELETE_BLOG',
      blog: blog
    })
  }
}

export const addBlog = (blog) => {
  return async(dispatch) => {
    const result = await blogService.create(blog)
    console.log('AddBlogs gets', result)
    dispatch ({
      type: 'ADD_BLOG',
      blog: result
    })
  }
}

export const addCommentToBlog = (blogid, comment) => {
  return async(dispatch) => {
    console.log('About to add: ', blogid, comment)
    const result = await blogService.addComment(blogid, comment)
    console.log('Comment adding result: ', result)
    dispatch ({
      type: 'ADD_COMMENT',
      id: blogid,
      comments: result.data.comments
    })
  }
}

export default blogsReducer



