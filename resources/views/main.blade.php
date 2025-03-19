<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Xpertnet</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body>
        <x-nav />

        <main>
            <x-hero />

            <div class="max-w-[1200px] mx-auto relative p-4 w-full">
                <x-steps />
            </div>
        </main>

        <script src="js/hero.js"></script>
    </body>
</html>
