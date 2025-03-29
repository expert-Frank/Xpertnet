<div>
    <div class="flex gap-4 items-start font-semibold text-black dark:text-neutral-100">
        <button class="{{ 'transition-all duration-250 relative curser-pointer rounded-full w-12 h-12 flex items-center justify-center font-semibold text-white text-xl ' . ($num > $current ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-600' : 'bg-emerald-600 text-white') }}" wire:click="setStep({{ $num }})">
            <svg  class="{{ 'absolute ' . ($num >= $current ? 'opacity-0' : 'opacity-100') }}" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
            <span class="{{ 'absolute ' . ($num < $current ? 'opacity-0' : 'opacity-100') }}">{{ $num + 1 }}</span>
        </button>
        <div class="mt-3">
            <h3 class="mb-1">{{ $title }}</h3>
            <p class="max-w-48 font-medium text-sm text-neutral-500 dark:text-neutral-400">{{ $desc }}</p>
        </div>
    </div>
</div>
