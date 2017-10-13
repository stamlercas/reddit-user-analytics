

'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserInfo from './components/UserInfo';
import NotFoundPage from './components/NotFoundPage';

const routes = (
	<Route path = "/" component={Layout}>
		<IndexRoute component={IndexPage}/>
		<Route path='/user/:username' component={UserInfo}/>
		<Route path='*' component={NotFoundPage}/>
	</Route>
);

export default routes;