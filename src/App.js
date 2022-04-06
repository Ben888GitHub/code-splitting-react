import { useState, lazy, Suspense } from 'react';

import Header from './Header';

const MyDefaultComponent = lazy(() => import('./MyDefaultComponent'));

function App() {
	const [names, setNames] = useState(null);
	// Import using Async/Await
	const onLoad = async () => {
		const names = (await import('./names')).default;

		// Controlling Chunk Names
		const makeUpperCase = (
			await import('./utilities' /* webpackChunkName: "utilities" */)
		).makeUpperCase;
		setNames(makeUpperCase(names));
	};

	return (
		<div className="App">
			<Header />
			<div>React Code Splitting</div>
			{/* button will dynamically load and import sth when clicked */}
			<button onClick={onLoad}>Load</button>
			<div>{JSON.stringify(names)}</div>
			{names && (
				<Suspense fallback={<div>Loading...</div>}>
					<MyDefaultComponent />
				</Suspense>
			)}
			{/* {names && <MyDefaultComponent />}  this doesn't work, because lazy-imported component need to be wrapped with Suspense*/}
		</div>
	);
}

export default App;
