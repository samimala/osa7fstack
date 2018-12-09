import React from 'react'

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState( { [event.target.name] : event.target.value })
  }

  handleLoginRequest = (event) => {
    event.preventDefault()
    console.log('About to call onLogin', this.state)
    this.props.onLogin(this.state)
    this.setState({
      username: '',
      password: '',
    })
  }

  form = () => (
    <div className="loginform">
      <h2>login</h2>
      <form onSubmit={this.handleLoginRequest}>
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

  render () {
    console.log('Todellakin renderöin')
    return (
      <div>
        {this.form()}
      </div>
    )
  }
}

export default LoginForm