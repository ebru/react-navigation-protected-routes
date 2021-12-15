import types from './types';

export const signInUser = () => ({
	type: types.SIGN_IN_USER,
});

export const logOutUser = () => ({
	type: types.LOG_OUT_USER,
});
