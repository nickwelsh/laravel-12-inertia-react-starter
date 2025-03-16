import { InboxIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { type PropsWithChildren } from 'react';
import { Navbar, NavbarDivider, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar';
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarSection } from '@/components/catalyst/sidebar';
import { StackedLayout } from '@/components/catalyst/stacked-layout';
import { useTypedPage } from '@/hooks/use-typed-page';
import { type NavItem } from '@/types';
import AppLogo from '@/components/app-logo';
import { UserDropdown } from '@/layouts/app/partials/user-dropdown';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';

export default function AppStackedLayout({ navItems, children }: PropsWithChildren<{ navItems: NavItem[] }>) {
	const { auth } = useTypedPage().props;

	return (
		<StackedLayout
			navbar={
				<Navbar>
					<NavbarSection className='max-lg:hidden'>
						<AppLogo />
					</NavbarSection>
					<NavbarDivider className='max-lg:hidden' />
					<NavbarSection className='max-lg:hidden'>
						{navItems.map(({ label, routeName, explicit }) => (
							<NavbarItem
								key={label}
								href={route(routeName)}
								current={route().current(explicit ? routeName : `${routeName}.*`)}
							>
								{label}
							</NavbarItem>
						))}
					</NavbarSection>
					<NavbarSpacer />
					<NavbarSection>
						<NavbarItem
							href='/search'
							aria-label='Search'
						>
							<MagnifyingGlassIcon />
						</NavbarItem>
						<NavbarItem
							href='/inbox'
							aria-label='Inbox'
						>
							<InboxIcon />
						</NavbarItem>
						<NavbarItem className='group'>
							<AppearanceToggleDropdown />
						</NavbarItem>
						{auth.user && <UserDropdown user={auth.user} />}
					</NavbarSection>
				</Navbar>
			}
			sidebar={
				<Sidebar>
					<SidebarHeader>
						<AppLogo />
					</SidebarHeader>
					<SidebarBody>
						<SidebarSection>
							{navItems.map(({ label, routeName, explicit }) => (
								<SidebarItem
									key={label}
									href={route(routeName)}
									current={route().current(explicit ? routeName : `${routeName}.*`)}
								>
									{label}
								</SidebarItem>
							))}
						</SidebarSection>
					</SidebarBody>
				</Sidebar>
			}
		>
			{children}
		</StackedLayout>
	);
}
