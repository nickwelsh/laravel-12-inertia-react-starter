import { ArrowRightStartOnRectangleIcon, ChevronUpIcon, Cog8ToothIcon } from '@heroicons/react/16/solid';
import {
	Dropdown,
	DropdownButton,
	DropdownDescription,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownMenu,
} from '@/components/catalyst/dropdown';
import { NavbarItem } from '@/components/catalyst/navbar';
import { Avatar } from '@/components/catalyst/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type InertiaUserData } from '@/types/generated';
import { SidebarItem } from '@/components/catalyst/sidebar';

function CompactTrigger({ user }: { user: InertiaUserData }) {
	const getInitials = useInitials();

	return (
		<DropdownButton as={NavbarItem}>
			<Avatar
				className='bg-slate-100'
				square
				initials={getInitials(user.name)}
			/>
		</DropdownButton>
	);
}

function LargeTrigger({ user }: { user: InertiaUserData }) {
	const getInitials = useInitials();

	return (
		<DropdownButton as={SidebarItem}>
			<span className='flex min-w-0 items-center gap-3'>
				<Avatar
					className='size-10 bg-slate-100'
					square
					initials={getInitials(user.name)}
				/>
				<span className='min-w-0'>
					<span className='block truncate text-sm/5 font-medium text-zinc-950 dark:text-white'>
						{user.name}
					</span>
					<span className='block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400'>
						{user.email}
					</span>
				</span>
			</span>
			<ChevronUpIcon />
		</DropdownButton>
	);
}

export function UserDropdown({ user, size = 'compact' }: { user: InertiaUserData; size?: 'compact' | 'large' }) {
	const getInitials = useInitials();

	return (
		<Dropdown>
			{size === 'compact' && <CompactTrigger user={user} />}
			{size === 'large' && <LargeTrigger user={user} />}
			<DropdownMenu
				className='min-w-64'
				anchor='bottom end'
			>
				<DropdownItem className='pointer-events-none flex items-center gap-x-2.5'>
					<div className='size-8'>
						<Avatar
							className='bg-slate-100'
							square
							initials={getInitials(user.name)}
						/>
					</div>
					<div>
						<DropdownLabel className='text-sm/4'>{user.name}</DropdownLabel>
						<DropdownDescription className='sm:text-xs/4'>{user.email}</DropdownDescription>
					</div>
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem href={route('profile.edit')}>
					<Cog8ToothIcon />
					<DropdownLabel>Settings</DropdownLabel>
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem
					href={route('logout')}
					method='post'
				>
					<ArrowRightStartOnRectangleIcon />
					<DropdownLabel>Sign out</DropdownLabel>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
