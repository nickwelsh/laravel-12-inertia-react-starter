import { useCallback, useEffect } from 'react';
import { produce } from 'immer';
import { createStore } from '@xstate/store';
import { useSelector } from '@xstate/store/react';

export type AppearanceOption = 'light' | 'dark' | 'system';
export type Appearance = AppearanceOption | undefined;

const prefersDark = () => {
	if (typeof window === 'undefined') {
		return false;
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
	if (typeof document === 'undefined') {
		return;
	}

	const maxAge = days * 24 * 60 * 60;
	document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
	const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());

	document.documentElement.classList.toggle('dark', isDark);
};

const mediaQuery = () => {
	if (typeof window === 'undefined') {
		return undefined;
	}

	return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
	const currentAppearance = localStorage.getItem('appearance') as Appearance;
	applyTheme(currentAppearance ?? 'system');
};

export function initializeTheme() {
	const savedAppearance = (localStorage.getItem('appearance') as Appearance) ?? 'system';

	applyTheme(savedAppearance);

	// Add the event listener for system theme changes...
	mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

const store = createStore({
	context: { appearance: 'system' as AppearanceOption },
	on: {
		setAppearance: (context, event: { appearance: AppearanceOption }) =>
			produce(context, draft => {
				draft.appearance = event.appearance;
			}),
	},
});

export function useAppearance() {
	// const [appearance, setAppearance] = useState<AppearanceOption>('system');
	const appearance = useSelector(store, state => state.context.appearance);

	const updateAppearance = useCallback((mode: AppearanceOption) => {
		store.trigger.setAppearance({ appearance: mode });

		// Store in localStorage for client-side persistence...
		localStorage.setItem('appearance', mode);

		// Store in cookie for SSR...
		setCookie('appearance', mode);

		applyTheme(mode);
	}, []);

	useEffect(() => {
		const savedAppearance = localStorage.getItem('appearance') as Appearance | undefined;
		updateAppearance(savedAppearance ?? 'system');

		return () => mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
	}, [updateAppearance]);

	return { appearance, updateAppearance } as const;
}
