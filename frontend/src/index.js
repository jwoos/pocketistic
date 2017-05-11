import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import App from './components/App';
import Login from './components/Login';
import NotFound from './components/NotFound';

import store from './store';

import './index.scss';

ReactDOM.render(
	(
		<Provider store={store}>
			<Router history={createHistory()}>
				<Switch>
					<Route exact path="/" component={App} />
					<Route path="/login" component={Login} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
		</Provider>
	),
	document.getElementById('root')
);
