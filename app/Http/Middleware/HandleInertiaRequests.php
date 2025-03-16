<?php

namespace App\Http\Middleware;

use App\Data\Inertia\InertiaData;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
	/**
	 * The root template that's loaded on the first page visit.
	 *
	 * @see https://inertiajs.com/server-side-setup#root-template
	 *
	 * @var string
	 */
	protected $rootView = 'app';

	/**
	 * Determines the current asset version.
	 *
	 * @see https://inertiajs.com/asset-versioning
	 */
	public function version(Request $request): ?string
	{
		return parent::version($request);
	}

	/**
	 * Define the props that are shared by default.
	 *
	 * @see https://inertiajs.com/shared-data
	 *
	 * @return InertiaData
	 */
	public function share(Request $request): InertiaData
	{
		[$message, $author] = str(Inspiring::quotes()->random())->explode('-');

		return InertiaData::from([
			...parent::share($request),
			'name' => config('app.name'),
			'quote' => ['message' => trim($message), 'author' => trim($author)],
			'auth' => [
				'user' => $request->user(),
			],
			'ziggy' => fn(): array => [...(new Ziggy())->toArray(), 'location' => $request->url()],
		]);
	}
}
