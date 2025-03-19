<nav class="w-full h-16 shadow-md shadow-emerald-600/30 bg-white px-4 py-2 flex justify-center">
    <div class="flex-1 flex gap-4 items-center">
        <a href="#steps">{{ __("messages.how") }}</a>
    </div>
    <a class="flex-1 flex justify-center" href={{ "/$locale" }}>
        <img src="/signet.svg" class="h-full drop-shadow-lg hover:rotate-[72deg] transition-all duration-150" />
    </a>
    <div class="flex-1 flex items-center justify-end gap-4">
        <a href={{ $locale == "en" ? "/de" : "/en" }}>{{ $locale == "en" ? "DE" : "EN" }}</a>
    </div>
</nav>
