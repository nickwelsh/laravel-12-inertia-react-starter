import { type ReactNode } from 'react';
import { type BreadcrumbItem, type NavItem } from '@/types';
import AppStackedLayout from '@/layouts/app/app-stacked-layout';

const navItems = [{ label: 'Dashboard', routeName: 'dashboard', explicit: true }] as const satisfies NavItem[];

type AppLayoutProps = {
	children: ReactNode;
	breadcrumbs?: BreadcrumbItem[];
};

const AppLayout = ({ children, ...props }: AppLayoutProps) => (
	<AppStackedLayout
		navItems={navItems}
		{...props}
	>
		{children}
	</AppStackedLayout>
);

export default AppLayout;
