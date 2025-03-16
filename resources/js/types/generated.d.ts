export type InertiaAuthData = {
	user: InertiaUserData | null;
};
export type InertiaData = {
	errors: Record<string, string> | null;
	name: string;
	quote: InertiaQuoteData;
	auth: InertiaAuthData;
};
export type InertiaQuoteData = {
	message: string;
	author: string;
};
export type InertiaUserData = {
	id: number;
	name: string;
	email: string;
	emailVerifiedAt: string | null;
	createdAt: string;
	updatedAt: string;
};
