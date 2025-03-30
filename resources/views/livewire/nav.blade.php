<nav class="w-full h-16 shadow-md shadow-emerald-600/30 dark:shadow-none bg-white px-6 py-2 flex justify-center dark:bg-neutral-900 dark:text-white text-black items-center">
    <!-- Desktop Navigation -->
    <div class="flex-1 lg:flex gap-4 items-center hidden">
        <a href="#steps">{{ __("messages.how") }}</a>
    </div>

    <!-- Mobile Navigation -->
    <!--<div class="flex flex-1 lg:hidden" id="mobile-nav"></div>-->
    <button wire:click="toggleNav" class="flex flex-1 lg:hidden">
        <div class="relative rotate-0 duration-500 cursor-pointer w-4 h-4">
            <span
                class="block absolute h-[1px] bg-black dark:bg-neutral-100 left-0 duration-250 w-full {{ $opened ? 'rotate-135 top-[8px]' : 'rotate-0 top-[3px]' }}"
            ></span>
            <span
                class="block absolute h-[1px] bg-black dark:bg-neutral-100 rotate-0 duration-250 w-full top-[8px] {{ $opened ? '-left-[60px]' : 'left-0' }}"
            ></span>
            <span
                class="block absolute h-[1px] bg-black dark:bg-neutral-100 left-0 duration-250 w-full {{ $opened ? '-rotate-135 top-[8px]' : 'rotate-0 top-[13px]' }}"
            ></span>
        </div>
    </button>
    <aside class="absolute top-16 w-full z-30 duration-250 bg-white dark:bg-neutral-900 min-h-[calc(100vh-64px)] p-4 {{ $opened ? 'left-0' : '-left-full' }}">
        asdf
    </aside>


    <!-- Logo -->
    <a class="flex-none w-12 flex justify-center" href={{ "/$locale" }}>
        <img src="/signet.svg" class="h-full drop-shadow-lg hover:rotate-[72deg] transition-all duration-150 relative z-50" />
    </a>

    <!-- Language -->
    <div class="flex-1 flex items-center justify-end gap-4">
        <a href={{ $locale == "en" ? "/de" : "/en" }}>{{ $locale == "en" ? "DE" : "EN" }}</a>
    </div>
</nav>
