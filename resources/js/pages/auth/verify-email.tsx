// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { type FormEventHandler, type ReactNode } from 'react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/catalyst/button';
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout';
import { Badge } from '@/components/catalyst/badge';

function VerifyEmail({ status }: { status?: string }) {
	const { post, processing } = useForm({});

	const submit: FormEventHandler = e => {
		e.preventDefault();

		post(route('verification.send'));
	};

	return (
		<>
			<Head title='Email verification' />

			{status === 'verification-link-sent' && (
				<div className='grid w-full place-items-center'>
					<Badge color='green'>
						A new verification link has been sent to the email address you provided during registration.
					</Badge>
				</div>
			)}

			<form
				onSubmit={submit}
				className='space-y-6 text-center'
			>
				<Button
					disabled={processing}
					className='w-full cursor-pointer bg-zinc-500/5'
					plain
				>
					{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
					Resend verification email
				</Button>

				<TextLink
					href={route('logout')}
					method='post'
					className='mx-auto block text-sm'
				>
					Log out
				</TextLink>
			</form>
		</>
	);
}

VerifyEmail.layout = (page: ReactNode) => (
	<AuthSimpleLayout
		title='Verify email'
		description='Please verify your email address by clicking on the link we just emailed to you.'
	>
		{page}
	</AuthSimpleLayout>
);

export default VerifyEmail;
