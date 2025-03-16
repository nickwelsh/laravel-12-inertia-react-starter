import { type LucideIcon } from 'lucide-react';
import { type Config, type ValidRouteName } from 'ziggy-js';

export type Auth = {
	user?: User;
};

export type BreadcrumbItem = {
	title: string;
	href: string;
};

export type NavItem = {
	label: string;
	routeName: ValidRouteName;
	icon?: LucideIcon | null;
	isActive?: boolean;
	explicit?: boolean;
};

export type SharedData = {
	name: string;
	quote?: { message: string; author: string };
	auth: Auth;
	ziggy: Config & { location: string };
	[key: string]: unknown;
};

export type User = {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
	[key: string]: unknown; // This allows for additional properties...
};
