<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>{{ $title ?? 'Page Title' }}</title>

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/ts/app.tsx'])
    </head>
    <body class="bg-neutral-50">
        <x-nav />

        {{ $slot }}
    </body>
</html>
