<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" className="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>{{ __('messages.title') }}</title>

        <meta name="description" content="{{ __('messages.description') }}">
        <meta property="og:title" content="Xpertnet">
        <meta property="og:description" content="{{ __('messages.title') }}">
        <meta property="og:image" content="https://xpertnet.ch/og-image.png">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Xpertnet">
        <meta name="twitter:description" content="{{ __('messages.title') }}">
        <meta name="twitter:image" content="https://xpertnet.ch/og-image.png">

        <link rel="icon" href="{{ url('/favicon.ico') }}">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/ts/app.tsx'])
    </head>
    <body class="bg-neutral-50 dark:bg-neutral-800">
        <livewire:nav />

        {{ $slot }}
    </body>
</html>
