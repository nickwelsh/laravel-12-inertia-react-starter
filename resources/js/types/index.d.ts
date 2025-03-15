import  { type LucideIcon } from 'lucide-react';
import  { type Config } from 'ziggy-js';

export type Auth = {
    user?: User;
}

export type BreadcrumbItem = {
    title: string;
    href: string;
}

export type NavGroup = {
    title: string;
    items: NavItem[];
}

export type NavItem = {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export type SharedData = {
    name: string;
    quote?: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
