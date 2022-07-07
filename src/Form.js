import React, { Component } from 'react';
import axios from "axios"; 

class GitHubIssuerForm extends Component {
  state = {
    title: '',
    body: ''
  };

handleSubmit = event => {
    event.preventDefault();
    const issue = {
      title: this.state.title,
      body: this.state.body
    }
    console.log(issue);

    axios.post('/api/repos/annikel/github-issuer/issues', issue)
      .then(res=>{
        console.log(res);
        console.log(res.data);
      })
  }
handleChange = event =>{
    this.setState({ title: event.target.value});
    this.setState({ body: event.target.value});
  }
render() {
    return (
      <div>
        <form onSubmit = { this.handleSubmit }>
          <label> Issue Title:
            <input type = "text" name = "title" onChange= {this.handleChange}/>
          </label>
          <label> Issue Description:
            <input type = "text" name = "description" onChange= {this.handleChange}/>
          </label>
          <button type = "submit"> Add </button>
        </form>
    </div>
    );
  }
}

export default GitHubIssuerForm;