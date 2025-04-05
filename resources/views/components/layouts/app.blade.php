<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" className="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>{{ __('messages.title') }}</title>

        <link rel="icon" href="{{ url('/favicon.ico') }}">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/ts/app.tsx'])
    </head>
    <body class="bg-neutral-50 dark:bg-neutral-800">
        <livewire:nav />

        {{ $slot }}
    </body>
</html>
