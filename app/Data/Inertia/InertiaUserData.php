<?php

namespace App\Data\Inertia;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class InertiaUserData extends Data
{
    public int $id;

    public string $name;

    public string $email;

    public ?CarbonImmutable $emailVerifiedAt;

    public CarbonImmutable $createdAt;

    public CarbonImmutable $updatedAt;
}
