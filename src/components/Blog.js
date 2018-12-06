import React from 'react'
import { Link } from 'react-router-dom'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      compressedForm: true,
    }
  }
  
  toggleCompression = () => {
    this.setState({compressedForm : !this.state.compressedForm})
  }
  blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  render() {
    const hideWhenCompressed = { display: this.state.compressedForm ? 'none': ''}

    return (
      <div style={this.blogStyle} className='allContent'>
        <Link to={"/blogs/"+this.props.id}>
          {this.props.title}        
        </Link>
        {' '}
        <span onClick={this.toggleCompression} className='toggler'> 
          {this.props.author}
        </span> 
        <div style={hideWhenCompressed} className='toggleContent'>
          <div>
            <a href={this.props.url}>{this.props.url}</a> 
          </div>
          <div>
            {this.props.likes} 
            {' likes '}
            <button onClick={this.props.onIncLikes}>like</button>
          </div>
          <div>
            {'Added by '} {this.props.user? this.props.user.name : 'unknown'}
          </div>
          <div>
            {(!this.props.user || this.props.loginUser===this.props.user.username) &&          
              <button onClick={this.props.onDeleteBlog}>delete</button>}
          </div>
        </div>
      </div>
  
    )
  }
}
export default Blog