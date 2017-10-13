'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
	// When you use React with ES2015 classes you should set this to event handlers
  constructor(props) {
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this);
  	this.handleUsernameChange = this.handleUsernameChange.bind(this);

  	this.state = {user : ''};
  }

  handleSubmit(e) {
  	e.preventDefault();
  	document.location = "/" + document.getElementById('username').value;
  }

  handleUsernameChange(e) {
  	this.setState({user: e.target.value});
  }

  render() {
    return (
    	<div className="container">
    		<div className="text-center">
    			<img src="img/reddit.png" className="img-fluid"></img>
    		</div>
	    	<div className="row">
	    		<div className="col-md-6 offset-md-3">
	    			<h1>Reddit User Data Analytics</h1>
	    		</div>
	    	</div>
	      <div className="row align-items-center">
	        <div className="col-md-6 offset-md-3">
	        	<form onSubmit={this.handleSubmit} className="form-group">
		        	<div className="input-group">
					    <span className="input-group-addon" id="username-addon">u/</span>
					    <input type="text" className="form-control" id="username" onChange={this.handleUsernameChange} placeholder="Enter username"></input>
					    <span className="input-group-btn">
				        	<Link className="btn btn-secondary" id="submit-btn" role="button" to={`/user/${this.state.user}`}>Go!</Link>
				      	</span>
				  	</div>
				    <small id="usernameHelp" className="form-text text-muted">Something something something</small>
			  	</form>
	        </div>
	      </div>
      </div>
    );
  }
}