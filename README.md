# Laravel + React Starter Kit (Catalyst UI Edition)

![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![Inertia](https://img.shields.io/badge/inertia-%239553E9.svg?style=for-the-badge&logo=inertia&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=%23333333)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

> This template requires a [Tailwind Plus](https://tailwindcss.com/plus) license.

## Introduction
This React starter kit is based on the official [React Starter Kit](https://github.com/laravel/react-starter-kit) and uses React 19, Inertia 2, TypeScript, Tailwind, and the Catalyst UI kit from Tailwind Plus.

## Installation

1. Clone this repository
```bash
git clone https://github.com/nickwelsh/laravel-12-inertia-react-starter.git
```
2. Install dependencies
```bash
composer install
bun install
```
3. Copy the `typescript` components from the Catalyst UI kit to the `resources/js/components/catalyst` directory.

4. Modify `resources/js/components/catalyst/button.tsx` to export styles.
```diff
- const styles = {
+ export const styles = {
```
4. Start the development server
```bash
bun dev
```
