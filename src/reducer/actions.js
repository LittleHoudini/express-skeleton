import { ACTION_TYPES } from "./reducer";

export const handleChange = (dispatch, e) => {
	const { name, value } = e.target;
	dispatch({
		type: ACTION_TYPES.CHANGE_INPUT,
		payload: { name, value },
	});
};
