import React from 'react'
    const blogs = () => (
      <div>
        <Notification /> 
        <h2>blogs</h2>
        <p>
          {this.state.user.username} 
          {' logged in '}
          <button onClick={this.onLogout}>Logout</button>
        </p>
        {console.log('Calling BlogList', this.state.blogs)}
        <Togglable buttonLabel="Create new blog" ref={component=>this.createBlogForm=component}>
          <CreateBlogForm
            newBlogTitle={this.state.newBlogTitle}
            newBlogAuthor={this.state.newBlogAuthor}
            newBlogUrl={this.state.newBlogUrl}
            handleChange={this.handleBlogFieldChange}
            handleSubmit={this.createBlog}
          />
        </Togglable>
        <BlogList />
      </div>
    )    
