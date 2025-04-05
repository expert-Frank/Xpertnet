<div class="min-h-[calc(100vh-64px)] shadow-md w-full relative flex flex-col items-center justify-center">
    <div id="hero-animation-1" class="absolute left-0 top-0 w-full h-full z-0 hidden lg:block"></div>
    <div id="hero-animation-2" class="absolute left-0 top-0 w-full h-full -z-[10] blur-sm hidden lg:block"></div>
    <div id="hero-animation-3" class="absolute left-0 top-0 w-full h-full -z-[20] blur-md hidden lg:block"></div>
    <div id="hero-animation-1-m" class="absolute left-0 top-0 w-full h-full z-0 block lg:hidden"></div>
    <div id="hero-animation-2-m" class="absolute left-0 top-0 w-full h-full -z-[10] blur-sm block lg:hidden"></div>

    <div class="text-center flex flex-col items-center z-20 relative text-black dark:text-neutral-300 w-full justify-center flex-1 gap-8">
        <div>
            <h1 class="p-6 text-center">
                <p class="font-bold text-2xl lg:text-5xl">{{ __('hero.welcome') }}</p>
                <img class="w-full max-w-[620px] mx-auto mt-12" src="/Xpertnet_logo_nopadding.svg" alt="Xpertnet" />
            </h1>
            <p class="font-bold text-2xl lg:text-5xl px-6">{{ __('hero.solution') }}</p>
        </div>
        <div class="mt-8 lg:mt-16 px-6 pb-4 backdrop-blur-lg border-y-2 border-lime-600 flex flex-col items-center gap-4 w-full bg-lime-200/5">
            <div class="flex items-center justify-center rounded-full border-2 border-lime-600 h-16 w-16 -mt-8 backdrop-blur-md">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-network"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" /><path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" /><path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" /><path d="M6 9h12" /><path d="M3 20h7" /><path d="M14 20h7" /><path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12 15v3" /></svg>
            </div>
            <p class="max-w-96 font-medium">{{ __('hero.description') }}</p>
        </div>
        <div class="p-6 w-full max-w-[600px]">
            <div class="p-4 flex gap-4 items-start bg-lime-200/30 border-lime-600 rounded-lg backdrop-blur-lg">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-barrier-block flex-none"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 21a1 1 0 0 1 0 -2h1v-2h-8v2h1a1 1 0 0 1 0 2h-4a1 1 0 0 1 0 -2h1v-2h-1a2 2 0 0 1 -2 -2v-7a2 2 0 0 1 2 -2h1v-1a1 1 0 1 1 2 0v1h8v-1a1 1 0 0 1 2 0v1h1a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-1v2h1a1 1 0 0 1 0 2zm-2.086 -13l-7 7h4.17l6.916 -7zm6.086 2.914l-4.086 4.086h4.086zm-10.916 -2.914h-3.084v3.084z" /></svg>
                <div class="flex flex-col gap-2 items-start text-left">
                    <h3 class="font-bold">{{ __('hero.construction') }}</h3>
                    <p>{{ __('hero.constructionDesc') }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
