'use strict';

import React from 'react';
import { Link } from 'react-router';
import Reddit from '@stamlercas/reddit.js';
import RecommendedSubreddit from './RecommendedSubreddit';

export default class UserInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {userInfo: {data: {name: '', link_karma: '', comment_karma: ''}},
					submitted: {data: {children: []}},
					comments: {data: {children: []}},
					recommendedSubreddits: [{sr_name: ''}]
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

	}

	render() {
		if(this.state.comments.data.children.length === 0) return null;
		var date_created = new Date(0);
		date_created.setUTCSeconds(this.state.userInfo.data.created_utc);
		return (
			<div>
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<h1>/u/{this.state.userInfo.data.name}</h1>
						<div className="text-cen">Joined Reddit on {date_created.toLocaleDateString("en-US")}</div>
						<span>
							<div className="row">
								<div className="col-6 text-cen">
									Link Karma: {this.state.userInfo.data.link_karma}
								</div>
								<div className="col-6 text-cen">
									Comment Karma: {this.state.userInfo.data.comment_karma}
								</div>
							</div>
						</span>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-8 offset-md-2">
							<h2>Recommended Subreddits</h2>
							<br />
							<div>
								{this.state.recommendedSubreddits.map((sr) => <RecommendedSubreddit subreddit={sr} />)}
							</div>
					</div>
				</div>
			</div>
		);
	}
}