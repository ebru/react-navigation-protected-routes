import { createSelector } from 'reselect';

export const isSignedInSelector = createSelector(
	[(state) => state.auth.isSignedIn],
	(isSignedIn) => isSignedIn
);

export const authSelector = createSelector(
	[(state) => state.auth],
	(auth) => auth
);