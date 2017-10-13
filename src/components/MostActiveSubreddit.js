'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class MostActiveSubreddit extends React.Component {

  render() {
  	var base_url = "https://reddit.com/r/";
    return (
    	<a target="_blank" className="btn btn-outline-primary btn-margin" role="button" href={base_url + this.props.subreddit[0]}>{this.props.subreddit[0]}
    		&nbsp;
    		<small>{this.props.subreddit[1]} post{ (this.props.subreddit[1] !== 1) ? 's' : '' }</small>
    	</a>
    );
  }
}