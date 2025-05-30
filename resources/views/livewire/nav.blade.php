<nav class="w-full h-16 shadow-md shadow-emerald-600/30 dark:shadow-none bg-white px-6 py-2 flex justify-center dark:bg-neutral-900 dark:text-white text-black items-center">
    <!-- Desktop Navigation -->
    <div class="flex-1 lg:flex gap-4 items-center hidden">
        @foreach ($navItems as $navItem)
            <a href="{{ $navItem['anchor'] }}">{{ $navItem['label'] }}</a>
        @endforeach
    </div>

    <!-- Mobile Navigation -->
    <!-- React Component: A non-instantaeous mobile nav is not nice to use -->
    <div class="flex flex-1 lg:hidden" id="mobile-nav" data-nav-items="{{ $navItemsJson }}" data-nav-imprint="{{ $imprintJson }}"></div>
    <!--<button wire:click="toggleNav" class="flex flex-1 lg:hidden">
        <div class="relative rotate-0 cursor-pointer w-4 h-4">
            <span
                class="transition-transform block absolute h-[1px] bg-black dark:bg-neutral-100 left-0 duration-250 w-full {{ $opened ? 'rotate-135 top-[8px]' : 'rotate-0 top-[3px]' }}"
            ></span>
            <span
                class="transition-transform block absolute h-[1px] bg-black dark:bg-neutral-100 rotate-0 duration-250 w-full top-[8px] {{ $opened ? '-translate-x-[60px]' : 'transition-x-0' }}"
            ></span>
            <span
                class="transition-transform block absolute h-[1px] bg-black dark:bg-neutral-100 left-0 duration-250 w-full {{ $opened ? '-rotate-135 top-[8px]' : 'rotate-0 top-[13px]' }}"
            ></span>
        </div>
    </button>
    <aside class="transition-transform absolute left-0 top-16 w-full z-30 duration-250 bg-white dark:bg-neutral-900 min-h-[calc(100vh-64px)] p-4 {{ $opened ? 'translate-x-0' : '-translate-x-full' }}">
        asdf
    </aside>-->


    <!-- Logo -->
    <a class="flex-none w-12 flex justify-center" href={{ "/$locale" }}>
        <img src="/signet.svg" class="h-full drop-shadow-lg hover:rotate-[72deg] transition-all duration-150 relative z-50" />
    </a>

    <!-- Language -->
    <div class="flex-1 flex items-center justify-end gap-4">
        <a href={{ $locale == "en" ? "/de" : "/en" }}>{{ $locale == "en" ? "DE" : "EN" }}</a>
    </div>
</nav>
