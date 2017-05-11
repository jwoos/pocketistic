const todoAdd = (title, description) => {
	return {
		payload: {
			title,
			description
		},
		type: 'TODO_ADD'
	};
};

const todoDelete = (id) => {
	return {
		payload: {
			id
		},
		type: 'TODO_DELETE'
	};
};

const todoDone = (id) => {
	return {
		payload: {
			id
		},
		type: 'TODO_DONE'
	};
};

const todoNotDone = (id) => {
	return {
		payload: {
			id
		},
		type: 'TODO_NOT_DONE'
	};
};

const todoEdit = (id, title, description) => {
	return {
		payload: {
			id,
			title,
			description
		},
		type: 'TODO_EDIT'
	};
};

export default {
	todoAdd,
	todoDelete,
	todoDone,
	todoNotDone,
	todoEdit
};
