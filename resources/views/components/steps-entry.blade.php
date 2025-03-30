<div class="flex gap-4 -ml-[38px] items-start mb-4 mt-8">
    <div class="relative">
        <div class="bg-emerald-500 rounded-full w-10 h-10 border-4 border-white dark:border-neutral-800 z-10 absolute shadow-md shadow-emerald-500/50 dark:shadow-none"></div>
        <span class="w-10 h-10 flex items-center justify-center text-white relative z-20 font-bold text-lg">{{ $num }}</span>
    </div>
    <div>
        <h3 class="font-bold text-xl mb-4 mt-[6px]">{{ $title }}</h3>
        {{ $slot }}
    </div>
</div>

