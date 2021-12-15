import types from './types';

const initialState = {
	isSignedIn: undefined,
};

type Action = {
	type: string,
	payload?: any
}

const authReducer = (state: any = initialState, action: Action) => {
	switch (action.type) {
		case types.SIGN_IN_USER:
			return {
				...state,
				isSignedIn: true,
			};
		case types.LOG_OUT_USER:
			return {
				...state,
				isSignedIn: false,
			};
		default:
			return state;
	}
};

export default authReducer;