import { type PropsWithChildren } from 'react';
import { Divider } from '@/components/catalyst/divider';
import { Heading, Subheading } from '@/components/catalyst/heading';
import { Navbar, NavbarItem, NavbarSection } from '@/components/catalyst/navbar';
import { type NavItem } from '@/types';

const sidebarNavItems = [
	{
		label: 'Profile',
		routeName: 'profile.edit',
	},
	{
		label: 'Password',
		routeName: 'password.edit',
	},
	{
		label: 'Appearance',
		routeName: 'appearance',
	},
] as const satisfies NavItem[];

export default function SettingsLayout({ children }: PropsWithChildren) {
	// When server-side rendering, we only render the layout on the client...
	if (typeof window === 'undefined') {
		return null;
	}

	return (
		<div className='px-4 py-6'>
			<div className='mx-auto mb-8 max-w-6xl'>
				<Heading>Settings</Heading>
				<Subheading>Manage your profile and account settings</Subheading>
				<Navbar className='mt-2'>
					<NavbarSection>
						{sidebarNavItems.map(({ label, routeName }) => (
							<NavbarItem
								key={label}
								href={route(routeName)}
								current={route().current(routeName)}
							>
								{label}
							</NavbarItem>
						))}
					</NavbarSection>
				</Navbar>
				<Divider className='-mt-px' />
			</div>

			<section className='mx-auto max-w-4xl space-y-12'>{children}</section>
		</div>
	);
}
