import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthCardLayout({
	children,
	title,
	description,
}: PropsWithChildren<{
	name?: string;
	title?: string;
	description?: string;
}>) {
	return (
		<div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
			<div className='flex w-full max-w-md flex-col gap-6'>
				<div className='flex flex-col gap-6'>
					<Card className='rounded-xl py-0'>
						<CardHeader className='px-10 pt-8 pb-0 text-left'>
							<Link
								href={route('home')}
								className='mb-4 flex gap-2 font-medium'
							>
								<div className='flex h-9 w-9'>
									<AppLogoIcon className='size-9 fill-current text-black dark:text-white' />
								</div>
							</Link>
							<CardTitle className='text-xl'>{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent className='px-10 py-8 pt-2'>{children}</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
