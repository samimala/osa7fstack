import React from 'react'
import { connect } from 'react-redux'
import SingleUser from './SingleUser'

//const readUsers = async () => {
//   const usersRetrieved = await userService.getUsers()
//   console.log('Got users as', usersRetrieved)
//this.props.showUsers(usersRetrieved)
//   return usersRetrieved.data
//}

class Users extends React.Component {

  render() {
    if (this.props===null || this.props.users===undefined) {
      return null
    }
    console.log('Writing users', this.props)

    return (
      <div className="User">
        <h2>Users</h2>
        <table>
          <thead>
            <tr><td><b>Name</b></td><td><b>Blogs added</b></td></tr>
          </thead>
          <tbody>
            {this.props.users.map((user)=>
              <SingleUser
                key={user.id}
                name={user.name}
                blogs={user.blogs.length}
                id={user.id}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(
  mapStateToProps,
  null)(Users)