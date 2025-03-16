<?php

namespace App\Data\Inertia;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class InertiaAuthData extends Data
{
    public ?InertiaUserData $user;
}
