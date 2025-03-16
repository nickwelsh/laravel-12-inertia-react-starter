import { Fragment, type HTMLAttributes } from 'react';
import { MenuButton } from '@headlessui/react';
import {
	ComputerDesktopIcon as ComputerDesktopIconOutline,
	MoonIcon as MoonIconOutline,
	SunIcon as SunIconOutline,
} from '@heroicons/react/24/outline';
import {
	ComputerDesktopIcon as ComputerDesktopIconSolid,
	MoonIcon as MoonIconSolid,
	SunIcon as SunIconSolid,
} from '@heroicons/react/24/solid';
import { useAppearance } from '@/hooks/use-appearance';
import { Dropdown, DropdownItem, DropdownMenu } from '@/components/catalyst/dropdown';
import { cn } from '@/lib/utils';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
	const { appearance, updateAppearance } = useAppearance();

	const getCurrentIcon = () => {
		switch (appearance) {
			case 'dark':
				return <MoonIconSolid />;
			case 'light':
				return <SunIconSolid />;
			default:
				return <ComputerDesktopIconSolid />;
		}
	};

	return (
		<div
			className={className}
			{...props}
		>
			<Dropdown>
				<MenuButton as={Fragment}>
					<div
						className={cn(
							// Leading icon/icon-only
							'*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5',
							// Trailing icon (down chevron or similar)
							'*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4',
							// Hover
							'group-hover:*:data-[slot=icon]:fill-zinc-950',
							// Active
							'group-active:*:data-[slot=icon]:fill-zinc-950',
							// Dark mode
							'dark:*:data-[slot=icon]:fill-zinc-400',
							'dark:group-hover:*:data-[slot=icon]:fill-white',
							'dark:group-active:*:data-[slot=icon]:fill-white',
						)}
					>
						{getCurrentIcon()}
						<span className='sr-only'>Toggle theme</span>
					</div>
				</MenuButton>

				<DropdownMenu>
					<DropdownItem
						className={cn(appearance === 'light' && 'bg-slate-900/10 dark:bg-slate-100/10')}
						onClick={() => {
							updateAppearance('light');
						}}
					>
						<span className='flex items-center gap-2'>
							{appearance === 'light' ? (
								<SunIconSolid className='size-5' />
							) : (
								<SunIconOutline className='size-5' />
							)}
							Light
						</span>
					</DropdownItem>
					<DropdownItem
						className={cn(appearance === 'dark' && 'bg-slate-900/10 dark:bg-slate-100/10')}
						onClick={() => {
							updateAppearance('dark');
						}}
					>
						<span className='flex items-center gap-2'>
							{appearance === 'dark' ? (
								<MoonIconSolid className='size-5' />
							) : (
								<MoonIconOutline className='size-5' />
							)}
							Dark
						</span>
					</DropdownItem>
					<DropdownItem
						className={cn(appearance === 'system' && 'bg-slate-900/10 dark:bg-slate-100/10')}
						onClick={() => {
							updateAppearance('system');
						}}
					>
						<span className='flex items-center gap-2'>
							{appearance === 'system' ? (
								<ComputerDesktopIconSolid className='size-5' />
							) : (
								<ComputerDesktopIconOutline className='size-5' />
							)}
							System
						</span>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}
