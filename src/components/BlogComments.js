import React from 'react'
import { List, Icon } from 'semantic-ui-react'

const BlogComments = (props) => (
  <div>
    <h2>Comments</h2>
    <List>
      {props.comments.map(comment=>
        <List.Item
          key={props.comments.indexOf(comment)}>
          <Icon className="heartbeat"/> &nbsp;
          {comment}
        </List.Item>)}
    </List>
  </div>
)

export default BlogComments