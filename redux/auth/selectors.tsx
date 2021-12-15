import { createSelector } from 'reselect';

export const isSignedInSelector = createSelector(
	[(state) => state.auth.isSignedIn],
	(isSignedIn) => isSignedIn
);