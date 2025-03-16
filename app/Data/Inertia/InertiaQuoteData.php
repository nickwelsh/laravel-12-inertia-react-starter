<?php

namespace App\Data\Inertia;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class InertiaQuoteData extends Data
{
	public string $message;

	public string $author;
}
