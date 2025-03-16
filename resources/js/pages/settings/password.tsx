import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { type FormEventHandler, type ReactNode, useRef } from 'react';
import { Text } from '@/components/catalyst/text';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/catalyst/button';
import { ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import AppLayout from '@/layouts/app-layout';

function Password() {
	const passwordInput = useRef<HTMLInputElement>(null);
	const currentPasswordInput = useRef<HTMLInputElement>(null);

	const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
		current_password: '',
		password: '',
		password_confirmation: '',
	});

	const updatePassword: FormEventHandler = e => {
		e.preventDefault();

		put(route('password.update'), {
			preserveScroll: true,
			onSuccess: () => {
				reset();
			},
			onError: errors => {
				if (errors.password) {
					reset('password', 'password_confirmation');
					passwordInput.current?.focus();
				}

				if (errors.current_password) {
					reset('current_password');
					currentPasswordInput.current?.focus();
				}
			},
		});
	};

	return (
		<>
			<Head title='Profile settings' />

			<div className='space-y-6'>
				<form
					onSubmit={updatePassword}
					className='space-y-6'
				>
					<Fieldset className='grid gap-6 sm:grid-cols-2 sm:[&>*+[data-slot=control]]:mt-0'>
						<div>
							<Legend>Update password</Legend>
							<Text>Ensure your account is using a long, random password to stay secure</Text>
						</div>
						<FieldGroup>
							<Field>
								<Label>Current password</Label>

								<Input
									ref={currentPasswordInput}
									value={data.current_password}
									onChange={e => {
										setData('current_password', e.target.value);
									}}
									type='password'
									className='mt-1 block w-full'
									autoComplete='current-password'
									placeholder='Current password'
								/>

								<ErrorMessage>{errors.current_password}</ErrorMessage>
							</Field>
							<Field>
								<Label>New password</Label>

								<Input
									ref={passwordInput}
									value={data.password}
									onChange={e => {
										setData('password', e.target.value);
									}}
									type='password'
									className='mt-1 block w-full'
									autoComplete='new-password'
									placeholder='New password'
								/>

								<ErrorMessage>{errors.password}</ErrorMessage>
							</Field>
							<Field>
								<Label>Confirm password</Label>

								<Input
									value={data.password_confirmation}
									onChange={e => {
										setData('password_confirmation', e.target.value);
									}}
									type='password'
									className='mt-1 block w-full'
									autoComplete='new-password'
									placeholder='Confirm password'
								/>

								<ErrorMessage>{errors.password_confirmation}</ErrorMessage>
							</Field>
							<div className='flex items-center gap-4'>
								<Button disabled={processing}>Save password</Button>

								<Transition
									show={recentlySuccessful}
									enter='transition ease-in-out'
									enterFrom='opacity-0'
									leave='transition ease-in-out'
									leaveTo='opacity-0'
								>
									<p className='text-sm text-neutral-600'>Saved</p>
								</Transition>
							</div>
						</FieldGroup>
					</Fieldset>
				</form>
			</div>
		</>
	);
}

Password.layout = (page: ReactNode) => (
	<AppLayout>
		<SettingsLayout>{page}</SettingsLayout>
	</AppLayout>
);

export default Password;
