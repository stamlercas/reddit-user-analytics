'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class RecommendedSubreddit extends React.Component {

  render() {
  	var base_url = "https://reddit.com/r/";
    return (
    	<a className="btn btn-outline-primary btn-margin" role="button" href={base_url + this.props.subreddit.sr_name}>{this.props.subreddit.sr_name}</a>
    );
  }
}