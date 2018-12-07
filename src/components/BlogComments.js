import React from 'react'
const BlogComments = (props) => (    
    <div>
        <h2>Comments</h2>
        <ul>
            {props.comments.map(comment=>
              <li key={props.comments.indexOf(comment)}>
                {comment}
              </li>)}
        </ul>
    </div>
)

export default BlogComments