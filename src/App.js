import React from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import { showInfoNotification, showErrorNotification, hideNotification} from './reducers/notificationReducer'
import Notification from './components/Notification'
import { showUsers } from './reducers/userReducer'
import Users from './components/Users'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newBlogUrl: '',
      newBlogAuthor: '',
      newBlogTitle: '',
      blogs: [],
      username: '',
      password: '',
      createBlogVisible: false,
      user: null
    }
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    this.setState({ blogs })
    const loggedUserJSON = window.localStorage.getItem('loggerBlogSystemUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
      const usersRetrieved = await userService.getUsers()
      console.log('Got users as', usersRetrieved)
      this.props.showUsers(usersRetrieved)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    console.log('Login - username: ', this.state.username, ' password: ', this.state.password)
    try {
      const response = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log('login response: ', response)
      window.localStorage.setItem('loggerBlogSystemUser', JSON.stringify(response))
      this.setState({ 
        username: '', 
        password: '',
        user: response
      })
      blogService.setToken(response.token)
      const usersRetrieved = await userService.getUsers()
      console.log('Got users as', usersRetrieved)
      this.props.showUsers(usersRetrieved)
    } 
    catch (exception) {
      console.log('Showing error message in login')
      this.props.showErrorNotification('wrong username or pasword')
      setTimeout(() => { this.props.hideNotification() }, 5000)
    }
  }

  createBlog = async (event) => {
    event.preventDefault()
    this.createBlogForm.toggleVisibility()
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
      this.setState({
        blogs: this.state.blogs.concat(response),
        newBlog: {}
      })
      this.props.showInfoNotification("a new blog '" + response.title + "' by " + response.author + " added")
      setTimeout(()=> this.props.hideNotification(), 5000)
    }
    catch (exception) {
      this.props.showErrorNotification('Adding blog failed')
      setTimeout(()=> this.props.hideNotification(), 5000)
    }
  }

  incBlogLikes = () => (blog) => async () => {
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
    const blogs = await blogService.getAll()
    this.setState({ blogs })
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
    const blogs = await blogService.getAll()
    this.setState({ blogs })
  }


  handleLoginFieldChange = (event) => {
    this.setState( { [event.target.name] : event.target.value })
  }

  handleBlogFieldChange = (event) => {
    const key = event.target.name
    console.log('Key is ' + key)
    this.setState( { [key] : event.target.value })
  }

  onLogout = () => {
    window.localStorage.removeItem('loggerBlogSystemUser')
    this.setState( { user: null })
  }
  
  render() {
    const loginForm = () => (
      <div className="loginform">
        <Notification /> 
        <h2>login</h2>
        <form onSubmit={this.login}>
          <div>           
            <b>username</b>
            <input 
              type="text" 
              name="username" 
              value={this.state.username}
              onChange={this.handleLoginFieldChange}/>
          </div>
          <div>
            <b>password</b>
            <input 
              type="text" 
              name="password" 
              value={this.state.password}
              onChange={this.handleLoginFieldChange}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const users = () => (
      <div>
        <p>
          {this.state.user.username} 
          {' logged in '}
          <button onClick={this.onLogout}>Logout</button>
        </p>
        <Users />
      </div>
    )
    
    const blogs = () => (
      <div>
        <Notification /> 
        <h2>blogs</h2>
        <p>
          {this.state.user.username} 
          {' logged in '}
          <button onClick={this.onLogout}>Logout</button>
        </p>
        {console.log('Calling BlogList', this.state.blogs)}
        <Togglable buttonLabel="Create new blog" ref={component=>this.createBlogForm=component}>
          <CreateBlogForm
            newBlogTitle={this.state.newBlogTitle}
            newBlogAuthor={this.state.newBlogAuthor}
            newBlogUrl={this.state.newBlogUrl}
            handleChange={this.handleBlogFieldChange}
            handleSubmit={this.createBlog}
          />
        </Togglable>
        <BlogList
            currentLogin={this.state.user} 
            blogs={this.state.blogs}
            onIncLikes={this.incBlogLikes()}
            onDeleteBlog={this.deleteBlog()}
         />
      </div>
    )    
    if (this.state.user === null) {
      console.log('loginForm about to print')
      return loginForm()
    }
    return users() 
    //return blogs()
  }
}

export default connect(
  null,
  { showInfoNotification, 
    showErrorNotification, 
    hideNotification,
    showUsers
  }
)(App)
