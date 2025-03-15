import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { route, type RouteName } from 'ziggy-js';
import { env } from '@/env';

const appName = env.VITE_APP_NAME;

createServer(page =>
	createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		title: title => `${title} - ${appName}`,
		resolve: name => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
		setup: ({ App, props }) => {
			/* eslint-disable */
			// @ts-expect-error
			global.route<RouteName> = (name, params, absolute) =>
				route(name, params as any, absolute, {
					// @ts-expect-error
					...page.props.ziggy,
					// @ts-expect-error
					location: new URL(page.props.ziggy.location),
				});
			/* eslint-enable */

			return <App {...props} />;
		},
	}),
);
