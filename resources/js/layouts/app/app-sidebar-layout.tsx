import { InboxIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { type PropsWithChildren } from 'react';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar';
import {
	Sidebar,
	SidebarBody,
	SidebarFooter,
	SidebarHeader,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
} from '@/components/catalyst/sidebar';
import { SidebarLayout } from '@/components/catalyst/sidebar-layout';
import { useTypedPage } from '@/hooks/use-typed-page';
import { UserDropdown } from '@/layouts/app/partials/user-dropdown';
import AppLogo from '@/components/app-logo';
import { type NavItem } from '@/types';
import { Icon } from '@/components/icon';

export default function AppSidebarLayout({ navItems, children }: PropsWithChildren<{ navItems: NavItem[] }>) {
	const { auth } = useTypedPage().props;

	return (
		<SidebarLayout
			navbar={
				<Navbar>
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
						{auth.user && <UserDropdown user={auth.user} />}
					</NavbarSection>
				</Navbar>
			}
			sidebar={
				<Sidebar>
					<SidebarHeader>
						<SidebarSection className='max-lg:hidden'>
							<AppLogo />
						</SidebarSection>
						<SidebarSection className='max-lg:hidden'>
							<SidebarItem href='/search'>
								<MagnifyingGlassIcon />
								<SidebarLabel>Search</SidebarLabel>
							</SidebarItem>
							<SidebarItem href='/inbox'>
								<InboxIcon />
								<SidebarLabel>Inbox</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
					</SidebarHeader>
					<SidebarBody>
						<SidebarSection>
							{navItems.map(({ label, routeName, explicit, icon }) => (
								<SidebarItem
									key={label}
									href={route(routeName)}
									current={route().current(explicit ? routeName : `${routeName}.*`)}
								>
									{icon && (
										<Icon
											iconNode={icon}
											className='size-5'
										/>
									)}
									<SidebarLabel>Home</SidebarLabel>
								</SidebarItem>
							))}
						</SidebarSection>
					</SidebarBody>
					<SidebarFooter className='max-lg:hidden'>
						{auth.user && (
							<UserDropdown
								user={auth.user}
								size='large'
							/>
						)}
					</SidebarFooter>
				</Sidebar>
			}
		>
			{children}
		</SidebarLayout>
	);
}
