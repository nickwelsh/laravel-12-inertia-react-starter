import { useForm } from '@inertiajs/react';
import { type FormEventHandler, useRef, useState } from 'react';
import { Button } from '@/components/catalyst/button';
import InputError from '@/components/input-error';
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/catalyst/dialog';
import { Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import { Text } from '@/components/catalyst/text';

export default function DeleteUser() {
	const [open, setOpen] = useState(false);
	const passwordInput = useRef<HTMLInputElement>(null);
	const {
		data,
		setData,
		delete: destroy,
		processing,
		reset,
		errors,
		clearErrors,
	} = useForm<Required<{ password: string }>>({ password: '' });

	const deleteUser: FormEventHandler = e => {
		e.preventDefault();

		destroy(route('profile.destroy'), {
			preserveScroll: true,
			onSuccess: () => {
				closeModal();
			},
			onError: () => passwordInput.current?.focus(),
			onFinish: () => {
				reset();
			},
		});
	};

	const closeModal = () => {
		clearErrors();
		reset();
	};

	return (
		<div className='grid gap-6 space-y-6 sm:grid-cols-2'>
			<div className='*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6'>
				<Text className='text-base/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white'>
					Delete account
				</Text>
				<Text>Delete your account and all of its resources</Text>
			</div>
			<div className='space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10'>
				<div className='*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6'>
					<Text className='text-base/6 font-semibold text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-100'>
						Warning
					</Text>
					<Text className='text-red-600 dark:text-red-100'>
						Please proceed with caution, this cannot be undone.
					</Text>
				</div>

				<Button
					color='red'
					onClick={() => {
						setOpen(true);
					}}
				>
					Delete account
				</Button>

				<Dialog
					open={open}
					onClose={setOpen}
				>
					<DialogTitle>Are you sure you want to delete your account?</DialogTitle>
					<DialogDescription>
						Once your account is deleted, all of its resources and data will also be permanently deleted.
						Please enter your password to confirm you would like to permanently delete your account.
					</DialogDescription>
					<form
						className='space-y-6'
						onSubmit={deleteUser}
					>
						<DialogBody>
							<Fieldset>
								<FieldGroup>
									<Field>
										<Label>Password</Label>

										<Input
											type='password'
											name='password'
											ref={passwordInput}
											value={data.password}
											onChange={e => {
												setData('password', e.target.value);
											}}
											placeholder='Password'
											autoComplete='current-password'
										/>

										<InputError message={errors.password} />
									</Field>
								</FieldGroup>
							</Fieldset>
						</DialogBody>
						<DialogActions>
							<Button
								plain
								onClick={() => {
									setOpen(false);
								}}
							>
								Cancel
							</Button>
							<Button
								color='red'
								disabled={processing}
								type='submit'
							>
								Delete account
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			</div>
		</div>
	);
}
