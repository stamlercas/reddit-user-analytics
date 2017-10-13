'use strict';

import React from 'react';
import { Link } from 'react-router';
import Reddit from '@stamlercas/reddit.js';
import RecommendedSubreddit from './RecommendedSubreddit';
import MostActiveSubreddit from './MostActiveSubreddit';

export default class UserInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {userInfo: {data: {name: '', link_karma: '', comment_karma: ''}},
					submitted: {data: {children: []}},
					comments: {data: {children: []}},
					recommendedSubreddits: [{sr_name: ''}],
					mostActiveSubreddits: [['', 0]]
				};
	}

	componentDidMount() {
		var temp;
		var self = this;
		reddit.user(this.props.params.username, "about").fetch(function(res) {
			self.setState({userInfo: res});
        });
        reddit.user(this.props.params.username, "submitted").fetch(function(res) {
			self.setState({submitted: res});

			reddit.user(self.props.params.username, "comments").fetch(function(res) {
				self.setState({comments: res});

				var rs = self.getRecommendedSubreddits(self.state.submitted, self.state.comments);
		        reddit.recommendedSubreddits(rs.join())
					.omit(rs.join())
					.fetch(function(res) {
						self.setState({recommendedSubreddits: res});
				});

				self.setState({mostActiveSubreddits: self.getMostActiveSubreddits(self.state.submitted, self.state.comments)});
			});
        });
        
        
        //this.setState({recommendedSubreddits: rs});
	}

	getRecommendedSubreddits(submitted, comments) {
		var subreddits = new Set();

		for (var i = 0; i < submitted.data.children.length; i++) {
			if (!subreddits.has(submitted.data.children[i].data.subreddit))
				subreddits.add(submitted.data.children[i].data.subreddit);
		}
		for (var i = 0; i < comments.data.children.length; i++) {
			if (!subreddits.has(comments.data.children[i].data.subreddit))
				subreddits.add(comments.data.children[i].data.subreddit);
		}
		return Array.from(subreddits);
	}

	getMostActiveSubreddits(submitted, comments) {
		var subreddits = new Map();
		for (var i = 0; i < submitted.data.children.length; i++) {
			if (!subreddits.has(submitted.data.children[i].data.subreddit)) {
				subreddits.set(submitted.data.children[i].data.subreddit, 1);
			} else {
				let count = subreddits.get(submitted.data.children[i].data.subreddit);
				subreddits.set(submitted.data.children[i].data.subreddit, count + 1);
			}
		}
		for (var i = 0; i < comments.data.children.length; i++) {
			if (!subreddits.has(comments.data.children[i].data.subreddit)) {
				subreddits.set(comments.data.children[i].data.subreddit, 1);
			} else {
				let count = subreddits.get(comments.data.children[i].data.subreddit);
				subreddits.set(comments.data.children[i].data.subreddit, count + 1);
			}
		}
		// sort
		return this.mergeSort(Array.from(subreddits));
	}

	mergeSort(arr)
	{
	    if (arr.length < 2)
	        return arr;
	 
	    var middle = parseInt(arr.length / 2);
	    var left   = arr.slice(0, middle);
	    var right  = arr.slice(middle, arr.length);
	 
	    return this.merge(this.mergeSort(left), this.mergeSort(right));
	}

	merge(left, right)
	{
	    var result = [];
	 
	    while (left.length && right.length) {
	        if (left[0][1] >= right[0][1]) {
	            result.push(left.shift());
	        } else {
	            result.push(right.shift());
	        }
	    }
	 
	    while (left.length)
	        result.push(left.shift());
	 
	    while (right.length)
	        result.push(right.shift());
	 
	    return result;
	}

	render() {
		if(this.state.comments.data.children.length === 0) return null;
		var date_created = new Date(0);
		date_created.setUTCSeconds(this.state.userInfo.data.created_utc);
		return (
			<div>
				<div className="jumbotron jumbotron-fluid jumbotron-shadow">
					<div className="row">
						<div className="col-md-8 offset-md-2">
						  <h1 className="display-3">/u/{this.state.userInfo.data.name}</h1>
						  <p class="lead">Joined Reddit on {date_created.toLocaleDateString("en-US")}</p>
						  <hr className="my-4"></hr>
						  <span>
							<div className="row">
								<div className="col-6 text-left">
									Link Karma: {this.state.userInfo.data.link_karma}
								</div>
								<div className="col-6 text-right">
									Comment Karma: {this.state.userInfo.data.comment_karma}
								</div>
							</div>
						</span>
						</div>
					</div>
				</div>
				<br />
				<div className="container">
					<div className="row">
						<div className="col-md-10 offset-md-1">
								<h2>Recommended Subreddits</h2>
								<br />
								<div className="text-center">
									{this.state.recommendedSubreddits.map((sr) => <RecommendedSubreddit subreddit={sr} />)}
								</div>
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-md-10 offset-md-1">
								<h2>Most Active Subreddits</h2>
								<br />
								<div className="text-center">
									{this.state.mostActiveSubreddits.map((sr) => <MostActiveSubreddit subreddit={sr} />)}
								</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}