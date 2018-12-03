import React from 'react'
import { connect } from 'react-redux'
import SingleUser from './SingleUser'

const Users = (props) => {
  if (props===null || props.users===undefined) {
    return null
  }
  console.log('Writing users', props)
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
         />  
       )}
       </tbody>
      </table>
    </div>)
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null)(Users)