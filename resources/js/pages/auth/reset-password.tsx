import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { type FormEventHandler, type ReactNode } from 'react';
import { Button } from '@/components/catalyst/button';
import { Input } from '@/components/catalyst/input';
import AuthLayout from '@/layouts/auth-layout';
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset';

type ResetPasswordProps = {
	token: string;
	email: string;
};

type ResetPasswordForm = {
	token: string;
	email: string;
	password: string;
	password_confirmation: string;
};

function ResetPassword({ token, email }: ResetPasswordProps) {
	const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
		token: token,
		email: email,
		password: '',
		password_confirmation: '',
	});

	const submit: FormEventHandler = e => {
		e.preventDefault();
		post(route('password.store'), {
			onFinish: () => {
				reset('password', 'password_confirmation');
			},
		});
	};

	return (
		<>
			<Head title='Reset password' />

			<form onSubmit={submit}>
				<Fieldset>
					<FieldGroup>
						<Field className='mb-6'>
							<Label>Password</Label>
							<Input
								type='password'
								name='password'
								autoComplete='new-password'
								value={data.password}
								className='mt-1 block w-full'
								autoFocus
								onChange={e => {
									setData('password', e.target.value);
								}}
								placeholder='Password'
							/>
							<ErrorMessage>{errors.password}</ErrorMessage>
						</Field>
						<Field>
							<Label>Confirm password</Label>
							<Input
								type='password'
								name='password_confirmation'
								autoComplete='new-password'
								value={data.password_confirmation}
								className='mt-1 block w-full'
								onChange={e => {
									setData('password_confirmation', e.target.value);
								}}
								placeholder='Confirm password'
							/>
							<ErrorMessage>{errors.password_confirmation}</ErrorMessage>
						</Field>
						<Button
							type='submit'
							className='mt-4 w-full'
							disabled={processing}
						>
							{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
							Reset password
						</Button>
					</FieldGroup>
				</Fieldset>
			</form>
		</>
	);
}

ResetPassword.layout = (page: ReactNode) => (
	<AuthLayout
		title='Reset password'
		description='Please enter your new password below'
	>
		{page}
	</AuthLayout>
);

export default ResetPassword;
