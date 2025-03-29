<div class="min-h-[calc(100vh-64px)] shadow-md w-full relative flex items-center justify-center">
    <div id="hero-animation-1" class="absolute left-0 top-0 w-full h-full z-0 hidden lg:block"></div>
    <div id="hero-animation-2" class="absolute left-0 top-0 w-full h-full -z-[10] blur-sm hidden lg:block"></div>
    <div id="hero-animation-3" class="absolute left-0 top-0 w-full h-full -z-[20] blur-md hidden lg:block"></div>
    <div id="hero-animation-1-m" class="absolute left-0 top-0 w-full h-full z-0 block lg:hidden"></div>
    <div id="hero-animation-2-m" class="absolute left-0 top-0 w-full h-full -z-[10] blur-sm block lg:hidden"></div>

    <div class="p-4 text-center flex flex-col items-center z-20 relative text-black dark:text-neutral-200">
        <!--<h1 class="font-black text-3xl lg:text-8xl mb-4">Willkommen bei <span class="inline lg:block bg-gradient-to-r from-emerald-500 to-lime-500 bg-clip-text text-transparent">Xpertnet</span></h1>-->
        <h1>
            <p class="font-black text-3xl lg:text-5xl mb-4">{{ __('hero.welcome') }}</p>
            <img class="w-full max-w-[620px]" src="/Xpertnet_logo_appliedfont.svg" alt="Xpertnet" />
        </h1>
        <p class="font-black text-3xl lg:text-5xl mb-4">{{ __('hero.solution') }}</p>
        <div class="mt-16 p-4 rounded-lg backdrop-blur-lg border border-lime-600">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-network"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" /><path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" /><path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" /><path d="M6 9h12" /><path d="M3 20h7" /><path d="M14 20h7" /><path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12 15v3" /></svg>
            <p class="max-w-96 font-medium">Ob Sie einen schnellen und stabilen Internetzugang für Ihr Zuhause oder für Ihr Unternehmen suchen, bei uns finden Sie maßgeschneiderte Angebote für alle Anforderungen. Wählen Sie zwischen VDSL, Fiber (Glasfaser) oder klassischen DSL-Lösungen und profitieren Sie von höchster Qualität und zuverlässiger Leistung.</p>
        </div>
    </div>
</div>
