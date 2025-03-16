import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
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
import { Text } from '@/components/catalyst/text';
import SettingsLayout from '@/layouts/settings/layout';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { styles as ButtonStyles } from '@/components/catalyst/button';
import { useAppearance } from '@/hooks/use-appearance';

const modes = [
	{
		name: 'Light',
		description: 'Bright, fresh, and clean',
		inactiveIcon: <SunIconOutline className='size-6' />,
		activeIcon: <SunIconSolid className='size-6' />,
	},
	{
		name: 'Dark',
		description: 'Recommended by 9/10 developers',
		inactiveIcon: <MoonIconOutline className='size-6' />,
		activeIcon: <MoonIconSolid className='size-6' />,
	},
	{
		name: 'System',
		description: 'Match your system theme',
		inactiveIcon: <ComputerDesktopIconOutline className='size-6' />,
		activeIcon: <ComputerDesktopIconSolid className='size-6' />,
	},
];
function Appearance() {
	const { appearance, updateAppearance } = useAppearance();

	return (
		<>
			<Head title='Appearance settings' />

			<div className='grid gap-6 space-y-6 sm:grid-cols-2'>
				<div className='*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6'>
					<Text className='text-base/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white'>
						Appearance settings
					</Text>
					<Text>Update your account's appearance settings</Text>
				</div>
				<div>
					<fieldset aria-label='Server size'>
						<RadioGroup
							value={appearance}
							onChange={updateAppearance}
							className='space-y-4'
						>
							{modes.map(mode => (
								<Radio
									key={mode.name}
									value={mode.name.toLowerCase()}
									aria-label={mode.name}
									aria-description={mode.description}
									className={cn(
										ButtonStyles.base,
										cn(ButtonStyles.solid, ButtonStyles.colors.light),
										'flex w-full cursor-pointer items-center justify-between !px-6 !py-4',
										'data-[focus]:border-blue-500 data-[focus]:ring-2 data-[focus]:ring-blue-500',
										'data-[checked]:[--btn-bg:theme(colors.slate.900/10)] dark:data-[checked]:[--btn-bg:theme(colors.slate.900/10)]',
										// 'data-[checked]:border-blue-500 data-[checked]:ring-2 data-[checked]:ring-blue-500',
									)}
								>
									<span className='flex items-center'>
										<span className='flex flex-col text-sm'>
											<Text className='text-base/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white'>
												{mode.name}
											</Text>
											<Text>{mode.description}</Text>
										</span>
									</span>
									<div>
										{mode.name.toLowerCase() === appearance ? mode.activeIcon : mode.inactiveIcon}
									</div>
								</Radio>
							))}
						</RadioGroup>
					</fieldset>
				</div>
			</div>
		</>
	);
}

Appearance.layout = (page: ReactNode) => (
	<AppLayout>
		<SettingsLayout>{page}</SettingsLayout>
	</AppLayout>
);

export default Appearance;
