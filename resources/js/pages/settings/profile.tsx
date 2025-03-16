import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { type FormEventHandler, type ReactNode } from 'react';
import { Button } from '@/components/catalyst/button';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import { Text } from '@/components/catalyst/text';
import DeleteUser from '@/pages/settings/partials/delete-user';
import InputError from '@/components/input-error';
import SettingsLayout from '@/layouts/settings/layout';
import AppLayout from '@/layouts/app-layout';
import { useTypedPage } from '@/hooks/use-typed-page';
import { Divider } from '@/components/catalyst/divider';

type ProfileForm = {
	name: string;
	email: string;
};

function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
	const { auth } = useTypedPage().props;

	const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
		name: auth.user?.name ?? '',
		email: auth.user?.email ?? '',
	});

	const submit: FormEventHandler = e => {
		e.preventDefault();

		patch(route('profile.update'), {
			preserveScroll: true,
		});
	};

	if (!auth.user) return null;

	return (
		<>
			<Head title='Profile settings' />

			<div className='space-y-6'>
				<form
					onSubmit={submit}
					className='space-y-6'
				>
					<Fieldset className='grid gap-6 sm:grid-cols-2 sm:[&>*+[data-slot=control]]:mt-0'>
						<div>
							<Legend>Profile information</Legend>
							<Text>Update your name and email address</Text>
						</div>
						<FieldGroup>
							<Field>
								<Label>Name</Label>

								<Input
									className='mt-1 block w-full'
									value={data.name}
									onChange={e => {
										setData('name', e.target.value);
									}}
									required
									autoComplete='name'
									placeholder='Full name'
								/>

								<InputError
									className='mt-2'
									message={errors.name}
								/>
							</Field>

							<Field>
								<Label>Email address</Label>

								<Input
									type='email'
									className='mt-1 block w-full'
									value={data.email}
									onChange={e => {
										setData('email', e.target.value);
									}}
									required
									autoComplete='username'
									placeholder='Email address'
								/>

								{mustVerifyEmail && auth.user.emailVerifiedAt === null && (
									<Description>
										{' '}
										Your email address is unverified.{' '}
										<Link
											href={route('verification.send')}
											method='post'
											as='button'
											className='text-foreground cursor-pointer underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500'
										>
											Click here to resend the verification email.
										</Link>
										{status === 'verification-link-sent' && (
											<div className='mt-2 text-sm font-medium text-green-600'>
												A new verification link has been sent to your email address.
											</div>
										)}
									</Description>
								)}
								<InputError
									className='mt-2'
									message={errors.email}
								/>
							</Field>

							<div className='flex items-center gap-4'>
								<Button disabled={processing}>Save</Button>

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

			<Divider />

			<DeleteUser />
		</>
	);
}

Profile.layout = (page: ReactNode) => (
	<AppLayout>
		<SettingsLayout>{page}</SettingsLayout>
	</AppLayout>
);

export default Profile;
