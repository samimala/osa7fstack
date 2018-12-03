import React from 'react'


const SingleUser = (props) => {
  return (
    <tr> 
      <td onClick={props.onClickName}>{props.name}</td>
      <td>{props.blogs}</td>
    </tr>
  ) 
}

export default SingleUser