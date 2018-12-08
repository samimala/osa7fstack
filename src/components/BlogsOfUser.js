import React from 'react'
import { connect } from 'react-redux'


class BlogsOfUser extends React.Component {

  render() {
    console.log('Filter is: ', this.props.filterid)
    //props.setUserFilter(props.id)
    console.log('Showing one user of id ', this.props)
    const userToShow = this.props.users.find(user=>user.id===this.props.filterid)
    console.log('user to show', userToShow)

    return (
      <div>
        <h1>{userToShow.name}</h1>
        <h2>Added blogs</h2>
        <ul>
          {userToShow.blogs.map((blog)=>
            <li key={blog._id}>
              {blog.title} {' by '}  {blog.author}
            </li>
          )}
        </ul>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
export default connect(
  mapStateToProps,
  null
)(BlogsOfUser)
