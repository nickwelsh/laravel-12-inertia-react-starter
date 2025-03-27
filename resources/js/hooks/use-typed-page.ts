import { usePage } from '@inertiajs/react';
import { type InertiaData } from '@/types/generated';

type CustomSharedData<T> = InertiaData & T;

export function useTypedPage<T = object>() {
	return usePage<CustomSharedData<T>>();
}
