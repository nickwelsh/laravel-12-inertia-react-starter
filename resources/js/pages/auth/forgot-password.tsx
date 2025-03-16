// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { type FormEventHandler, type ReactNode } from 'react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/catalyst/button';
import { Input } from '@/components/catalyst/input';
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset';
import AuthLayout from '@/layouts/auth-layout';

function ForgotPassword({ status }: { status?: string }) {
	const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
		email: '',
	});

	const submit: FormEventHandler = e => {
		e.preventDefault();

		post(route('password.email'));
	};

	return (
		<>
			<Head title='Forgot password' />

			{status && <div className='mb-4 text-center text-sm font-medium text-green-600'>{status}</div>}

			<div className='space-y-6'>
				<form onSubmit={submit}>
					<Fieldset>
						<FieldGroup>
							<Field>
								<Label htmlFor='email'>Email address</Label>
								<Input
									id='email'
									type='email'
									name='email'
									autoComplete='off'
									value={data.email}
									autoFocus
									onChange={e => {
										setData('email', e.target.value);
									}}
									placeholder='email@example.com'
								/>

								<ErrorMessage>{errors.email}</ErrorMessage>
							</Field>
						</FieldGroup>
						<div className='my-6 flex items-center justify-start'>
							<Button
								className='w-full'
								disabled={processing}
							>
								{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
								Email password reset link
							</Button>
						</div>
						<div className='text-muted-foreground space-x-1 text-center text-sm'>
							<span>Or, return to</span>
							<TextLink href={route('login')}>log in</TextLink>
						</div>
					</Fieldset>
				</form>
			</div>
		</>
	);
}

ForgotPassword.layout = (page: ReactNode) => (
	<AuthLayout
		title='Forgot password'
		description='Enter your email to receive a password reset link'
	>
		{page}
	</AuthLayout>
);

export default ForgotPassword;
