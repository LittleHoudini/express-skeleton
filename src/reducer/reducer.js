export const INITIAL_STATE = {
	id: "",
	name: "",
	price: 0,
	quantity: 0,
};

export const ACTION_TYPES = {
	CHANGE_INPUT: "CHANGE_INPUT",
};

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_INPUT:
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		default:
			return state;
	}
};
