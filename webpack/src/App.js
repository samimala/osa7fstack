import React from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import { showInfoNotification, showErrorNotification, hideNotification} from './reducers/notificationReducer'
import { getBlogs, addBlog } from './reducers/blogsReducer'
import Notification from './components/Notification'
import { getUsers } from './reducers/userReducer'
import Users from './components/Users'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { loginUser, logoutUser } from './reducers/loginReducer'
import BlogsOfUser from './components/BlogsOfUser'
import BlogView from './components/BlogView'
import SingleBlog from './components/SingleBlog'
import { Container, Menu } from 'semantic-ui-react'

const LoggedInUser = (props) => (
  <div>
    <Menu secondary className="ui secondary pointing menu">
      <Menu.Item as={ Link } to="/blogs">Blogs</Menu.Item>
      <Menu.Item as={ Link } to="/users">Users</Menu.Item>
      <Menu.Item
        name="Logout"
        onClick={props.onLogout}
      />
      <Menu.Item>
        <b>{props.username}{' logged in '}</b>
      </Menu.Item>
    </Menu>
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
      this.props.getBlogs()
      this.props.getUsers()
    }
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
      this.props.getUsers()
      console.log('Got users as', this.props.users)
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
        <Container>
          <div>
            <Notification />
            <LoginForm onLogin={this.login} />
          </div>
        </Container>
      )
    }

    console.log('LoggedInUser is: ', this.props.loggedInUser)
    return (
      <Container>
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
                <SingleBlog blog={this.props.blogs.find(blog=>blog.id===match.params.id)}/>)}/>

              <Route exact path="/users/:id" render={({match})=> {
                console.log('This: ', this)
                console.log('Route users-id', match)
                return (
                  <BlogsOfUser filterid={match.params.id} />
                )}}
              />
            </div>
          </Router>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loginUser,
    blogs: state.blogs
  }
}
export default connect(
  mapStateToProps,
  { showInfoNotification,
    showErrorNotification,
    hideNotification,
    getUsers,
    getBlogs,
    addBlog,
    loginUser,
    logoutUser
  })(App)
