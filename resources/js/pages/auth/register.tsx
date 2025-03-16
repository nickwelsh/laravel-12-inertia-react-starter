import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { type FormEventHandler, type ReactNode } from 'react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/catalyst/button';
import { Input } from '@/components/catalyst/input';
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

function Register() {
	const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	const submit: FormEventHandler = e => {
		e.preventDefault();
		post(route('register'), {
			onFinish: () => {
				reset('password', 'password_confirmation');
			},
		});
	};

	return (
		<>
			<Head title='Register' />
			<form
				className='flex flex-col gap-6'
				onSubmit={submit}
			>
				<Fieldset>
					<FieldGroup>
						<Field className='mb-6'>
							<Label>Name</Label>
							<Input
								type='text'
								required
								autoFocus
								autoComplete='name'
								value={data.name}
								onChange={e => {
									setData('name', e.target.value);
								}}
								disabled={processing}
								placeholder='Full name'
							/>
							<ErrorMessage>{errors.name}</ErrorMessage>
						</Field>
						<Field className='mb-6'>
							<Label>Email address</Label>
							<Input
								type='email'
								required
								autoComplete='email'
								value={data.email}
								onChange={e => {
									setData('email', e.target.value);
								}}
								disabled={processing}
								placeholder='email@example.com'
							/>
							<ErrorMessage>{errors.email}</ErrorMessage>
						</Field>
						<Field className='mb-6'>
							<Label>Password</Label>
							<Input
								type='password'
								required
								autoComplete='new-password'
								value={data.password}
								onChange={e => {
									setData('password', e.target.value);
								}}
								disabled={processing}
								placeholder='Password'
							/>
							<ErrorMessage>{errors.password}</ErrorMessage>
						</Field>
						<Field>
							<Label>Confirm password</Label>
							<Input
								type='password'
								required
								autoComplete='new-password'
								value={data.password_confirmation}
								onChange={e => {
									setData('password_confirmation', e.target.value);
								}}
								disabled={processing}
								placeholder='Confirm password'
							/>
							<ErrorMessage>{errors.password_confirmation}</ErrorMessage>
						</Field>
						<Button
							type='submit'
							className='mt-2 w-full'
							tabIndex={5}
							disabled={processing}
						>
							{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
							Create account
						</Button>
						<div className='text-muted-foreground text-center text-sm'>
							Already have an account?{' '}
							<TextLink
								href={route('login')}
								tabIndex={6}
							>
								Log in
							</TextLink>
						</div>
					</FieldGroup>
				</Fieldset>
			</form>
		</>
	);
}

Register.layout = (page: ReactNode) => (
	<AuthLayout
		title='Create an account'
		description='Enter your details below to create your account'
	>
		{page}
	</AuthLayout>
);

export default Register;
