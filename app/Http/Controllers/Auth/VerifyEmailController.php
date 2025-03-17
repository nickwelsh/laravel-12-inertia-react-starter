<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
	/**
	 * Mark the authenticated user's email address as verified.
	 */
	public function __invoke(EmailVerificationRequest $request): RedirectResponse
	{
		$user = $request->user();
		assert($user instanceof MustVerifyEmail);

		if ($user->hasVerifiedEmail()) {
			return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
		}

		if ($user->markEmailAsVerified()) {
			$verifiedUsed = $user;

			event(new Verified($verifiedUsed));
		}

		return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
	}
}
