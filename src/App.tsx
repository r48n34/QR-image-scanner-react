import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { Suspense, lazy } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingPage from './components/LoadingPage';

const HomePage = lazy(() => import('./pages/HomePage'));

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
]);

function App() {
	return (
		<>
			<ColorSchemeScript defaultColorScheme="dark" />
			<MantineProvider defaultColorScheme="dark">
				<Notifications />
				<Suspense fallback={<LoadingPage />}>
					<RouterProvider router={router} />
				</Suspense>
			</MantineProvider>
		</>
	)
}

export default App