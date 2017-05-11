import {applyMiddleware, createStore, compose} from 'redux';
import {combineReducers} from 'redux-immutable';
import {createLogger} from 'redux-logger';
import Immutable from 'immutable';

import reducers from './reducers';

const reducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	Immutable.Map({}),
	composeEnhancers(
		applyMiddleware(
			createLogger()
		)
	)
);

export default store;
