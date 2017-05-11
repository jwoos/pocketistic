import {createReducer} from 'redux-create-reducer';
import Immutable from 'immutable';
import uuid from 'uuid';

const initialState = Immutable.Map({});

const TODO_ADD = (state, action) => {
	const id = uuid();
	const currentDateTime = new Date();

	return state.set(id, Immutable.Map({
		datetimeCreated: currentDateTime,
		datetimeDone: null,
		datetimeUpdated: currentDateTime,
		description: action.payload.description,
		done: false,
		title: action.payload.title,
	}));
};

const TODO_DELETE = (state, action) => {
	return state.delete(action.payload.id);
};

const TODO_DONE = (state, action) => {
	const currentDateTime = new Date();
	const originalState = state.get(action.payload.id);
	const modifiedState = originalState.merge(Immutable.Map({
		done: true,
		datetimeDone: currentDateTime,
		datetimeUpdated: currentDateTime,
	}));

	return state.set(action.payload.id, modifiedState);
};

const TODO_NOT_DONE = (state, action) => {
	const currentDateTime = new Date();
	const originalState = state.get(action.payload.id);
	const modifiedState = originalState.merge(Immutable.Map({
		done: false,
		datetimeDone: null,
		datetimeUpdated: currentDateTime,
	}));

	return state.set(action.payload.id, modifiedState);
};

const TODO_EDIT = (state, action) => {
	const currentDateTime = new Date();
	const originalState = state.get(action.payload.id);
	const modifiedState = originalState.merge(Immutable.Map({
		title: action.payload.title,
		description: action.payload.description,
		datetimeUpdated: currentDateTime,
	}));

	return state.set(action.payload.id, modifiedState);
};

export default createReducer(initialState, {
	TODO_ADD,
	TODO_DELETE,
	TODO_DONE,
	TODO_NOT_DONE,
	TODO_EDIT
});
