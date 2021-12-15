import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import useCachedResources from './hooks/useCachedResources';
import Root from './Root'

const App = () => {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<Provider store={store}>
				<Root />
			</Provider>
		);
	}
}

export default App
