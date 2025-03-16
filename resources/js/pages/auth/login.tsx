import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { type FormEventHandler, type ReactNode } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/catalyst/button';
import { Checkbox } from '@/components/catalyst/checkbox';
import { Input } from '@/components/catalyst/input';
import { Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
	email: string;
	password: string;
	remember: boolean;
};

type LoginProps = {
	status?: string;
	canResetPassword: boolean;
};

function Login({ status, canResetPassword }: LoginProps) {
	const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
		email: '',
		password: '',
		remember: false,
	});

	const submit: FormEventHandler = e => {
		e.preventDefault();
		post(route('login'), {
			onFinish: () => {
				reset('password');
			},
		});
	};

	return (
		<>
			<Head title='Log in' />

			<form
				className='flex flex-col gap-6'
				onSubmit={submit}
			>
				<Fieldset>
					<FieldGroup>
						<Field className='mb-6'>
							<Label>Email address</Label>
							<Input
								type='email'
								required
								autoFocus
								tabIndex={1}
								autoComplete='email'
								value={data.email}
								onChange={e => {
									setData('email', e.target.value);
								}}
								placeholder='email@example.com'
							/>
							<InputError message={errors.email} />
						</Field>
						<Field>
							<Label>Password</Label>
							<Input
								type='password'
								required
								tabIndex={2}
								autoComplete='current-password'
								value={data.password}
								onChange={e => {
									setData('password', e.target.value);
								}}
								placeholder='Password'
							/>
							<InputError message={errors.password} />
						</Field>
						<div className='flex items-center justify-between'>
							<Field className='flex items-center gap-2'>
								<Checkbox
									name='remember'
									checked={data.remember}
									onClick={() => {
										setData('remember', !data.remember);
									}}
								/>
								<Label>Remember me</Label>
							</Field>
							{canResetPassword && (
								<TextLink
									href={route('password.request')}
									className='ml-auto text-sm'
									tabIndex={5}
								>
									Forgot password?
								</TextLink>
							)}
						</div>
						<Button
							type='submit'
							className='w-full'
							tabIndex={4}
							disabled={processing}
						>
							{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
							Log in
						</Button>
					</FieldGroup>
				</Fieldset>

				<div className='text-muted-foreground text-center text-sm'>
					Don't have an account?{' '}
					<TextLink
						href={route('register')}
						tabIndex={5}
					>
						Sign up
					</TextLink>
				</div>
			</form>

			{status && <div className='mb-4 text-center text-sm font-medium text-green-600'>{status}</div>}
		</>
	);
}

Login.layout = (page: ReactNode) => (
	<AuthLayout
		title='Log in to your account'
		description='Enter your email and password below to log in'
	>
		{page}
	</AuthLayout>
);

export default Login;
