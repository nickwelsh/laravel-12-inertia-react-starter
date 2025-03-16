// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { type FormEventHandler, type ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/catalyst/button';
import { Input } from '@/components/catalyst/input';
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout';
import { Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset';

function ConfirmPassword() {
	const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
		password: '',
	});

	const submit: FormEventHandler = e => {
		e.preventDefault();

		post(route('password.confirm'), {
			onFinish: () => {
				reset('password');
			},
		});
	};

	return (
		<>
			<Head title='Confirm password' />

			<form onSubmit={submit}>
				<Fieldset>
					<FieldGroup>
						<Field>
							<Label>Password</Label>
							<Input
								type='password'
								name='password'
								placeholder='Password'
								autoComplete='current-password'
								value={data.password}
								autoFocus
								onChange={e => {
									setData('password', e.target.value);
								}}
							/>

							<InputError message={errors.password} />
						</Field>
						<div className='flex items-center'>
							<Button
								className='w-full'
								disabled={processing}
							>
								{processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
								Confirm password
							</Button>
						</div>
					</FieldGroup>
				</Fieldset>
			</form>
		</>
	);
}

ConfirmPassword.layout = (page: ReactNode) => (
	<AuthSimpleLayout
		title='Confirm your password'
		description='This is a secure area of the application. Please confirm your password before continuing.'
	>
		{page}
	</AuthSimpleLayout>
);

export default ConfirmPassword;
