import React from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { showInfoNotification, showErrorNotification, hideNotification} from './reducers/notificationReducer'
import { setBlogs, addBlog } from './reducers/blogsReducer'
import Notification from './components/Notification'
import { showUsers } from './reducers/userReducer'
import Users from './components/Users'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { loginUser, logoutUser } from './reducers/loginReducer'
import BlogsOfUser from './components/BlogsOfUser'
import BlogView from './components/BlogView'
import SingleBlog from './components/SingleBlog'

const LoggedInUser = (props) => (
  <div>
      <Link to="/blogs">Blogs</Link> &nbsp;
      <Link to="/users">Users</Link> &nbsp;
      {props.username} 
      {' logged in '}
      <button onClick={props.onLogout}>Logout</button>
  </div>

)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newBlogUrl: '',
      newBlogAuthor: '',
      newBlogTitle: '',
      createBlogVisible: false,
    }
  }
  

  componentDidMount = () => {
    console.log('componentDidMount')
    const loggedUserJSON = window.localStorage.getItem('loggerBlogSystemUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.props.loginUser(user)
      this.getData()
    }
  } 

//  getDataNotInUse = async () => {
//    console.log('GetData called')
//    const blogs = await blogService.getAll()
//    const usersRetrieved = await userService.getUsers()
//    console.log('Setting blogs and userlist', {blogs, usersRetrieved})
//    this.props.setBlogs(blogs)
//  //console.log('Got users as', usersRetrieved)
//    this.props.showUsers(usersRetrieved)
//    console.log('GetData ends')
//  } 

  getData = () => {
    console.log('GetData called')
    blogService.getAll().then(blogs => this.props.setBlogs(blogs))
    userService.getUsers().then(usersRetrieved=>this.props.showUsers(usersRetrieved))
    console.log('GetData ends')
  } 

  login = async (userdata) => {
    console.log('Login - username: ', userdata.username, ' password: ', userdata.password)
    try {
      const response = await loginService.login({
        username: userdata.username,
        password: userdata.password
      })
      console.log('login response: ', response)
      this.props.loginUser(response)
      window.localStorage.setItem('loggerBlogSystemUser', JSON.stringify(response))
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


  onLogout = () => {
    window.localStorage.removeItem('loggerBlogSystemUser')
    this.props.logoutUser()
  }
  
  render() {
    console.log('App rendering: ', this.state)   
    if (this.props.loggedInUser === null) {
      console.log('loginForm about to print')
      return (
        <div>
        <Notification /> 
        <LoginForm onLogin={this.login} />
        </div>
      )
    }

    console.log('LoggedInUser is: ', this.props.loggedInUser)
    return (
      <div>
      <Notification />   
        
      <Router> 
        <div>
        <LoggedInUser
           username={this.props.loggedInUser.username}
           onLogout={this.onLogout}
          />
          <Route exact path="/" render={()=> <BlogView />} />
          <Route exact path="/users" render={()=> <Users />} />
          <Route exact path="/blogs" render={()=> <BlogView />} />
          <Route exact path="/blogs/:id" render={({match}) => (
            <SingleBlog blogid={match.params.id}/>)} />

          <Route exact path="/users/:id" render={({match})=> {
            console.log('Route users-id', match)
            return (
              <BlogsOfUser filterid={match.params.id} />
            )}} 
          />
        </div>
      </Router>
      </div>
    )
    //return blogs()
    //return users()
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loginUser
  }
}
export default connect(
  mapStateToProps,
  { showInfoNotification, 
    showErrorNotification, 
    hideNotification,
    showUsers,
    setBlogs,
    addBlog,
    loginUser,
    logoutUser
  })(App)
