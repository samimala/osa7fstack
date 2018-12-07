const blogsReducer = (state=[], action) => {
  console.log('Store state', state)
  switch (action.type) {
  case 'STORE_BLOGS':
    return [ ...action.blogs ];
  case 'ADD_BLOG':
    return state.concat(action.blog)
  case 'ADD_LIKE':
    console.log('Addling like to id', action.id)
    const nextstate = state.map(blog=>({...blog, likes: (blog.id!==action.id)?blog.likes:blog.likes+1}))
    .sort((a,b)=> b.likes-a.likes)
    console.log('Next state after addlike:', nextstate)
    return  nextstate
  case 'DELETE_BLOG':
    return [...state.filter(blog => blog.id != action.blog.id)]
  case 'ADD_COMMENT':
    console.log('Comment reducer: ', action)
    return state.map(blog=>({...blog, 
      comments: (blog.id!==action.id)?blog.comments:blog.comments.concat([action.comment])}))
  default:
  }
  return state
}

export const setBlogs = (blogs) => {
  console.log('SetBlogs gets', blogs)
  return {
    type: 'STORE_BLOGS',
    blogs: blogs
  }
}

export const addLikeToBlog = (id) => {
  return {
    type: 'ADD_LIKE',
    id: id
  }
}

export const deleteBlog = (blog) => {
  return {
    type: 'DELETE_BLOG',
    blog: blog
  }
}

export const addBlog = (blog) => {
  console.log('AddBlogs gets', blog)
  return {
    type: 'ADD_BLOG',
    blog: blog
  }
}

export const addCommentToBlog = (data) => {
  return {
    type: 'ADD_COMMENT',
    id: data.blogid,
    comment: data.comment
  }
}
export default blogsReducer



