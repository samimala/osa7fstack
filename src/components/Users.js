import React from 'react'
import { connect } from 'react-redux'
import SingleUser from './SingleUser'
import { setUserFilter } from '../reducers/userReducer'

const Users = (props) => {

  const onClickUserName = (id) => () => {
    console.log('Calling click username ', id)
    props.setUserFilter(id)
  }
  
  if (props===null || props.users===undefined) {
    return null
  }
  console.log('Writing users', props)
  
  if (props.filter===null) {
    return (
      <div className="User">
        <h2>Users</h2>
        <table>
          <thead>
            <tr><td><b>Name</b></td><td><b>Blogs added</b></td></tr>
          </thead>  
          <tbody>
           {props.users.map((user)=>
             <SingleUser 
               key={user.id}
               name={user.name}
               blogs={user.blogs.length}
               onClickName={onClickUserName(user.id)} 
            />  
           )}
          </tbody>
        </table>
      </div>
    )
  }

  console.log('Showing one user of id ', props)
  const userToShow = props.users.find(user=>user.id===props.filter)
  console.log('user to show', userToShow)
  return (
      <div>
          <h1>{userToShow.name}</h1>
          <h2>Added blogs</h2>
          <ul>
          {userToShow.blogs.map((blog)=>
                <li key={blog.id}>
                  {blog.title} " by " {blog.author}
                </li>
           )}
          </ul>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.userdata.users,
    filter: state.userdata.filter
  }
}

export default connect(
  mapStateToProps,
  {setUserFilter})(Users)