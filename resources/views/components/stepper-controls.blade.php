<div class="flex-none flex justify-center items-center gap-2">
    <button wire:click="setStep({{ $current - 1 }})" class="cursor-pointer {{ 'px-3 py-2 rounded-md shadow-md text-white font-semibold flex gap-2 ' . ($current === 0 ? 'bg-neutral-300 dark:bg-neutral-700' : 'bg-emerald-600 hover:bg-emerald-500' ) }}">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
        <span>{{ __('stepper.back') }}</span>
    </button>
    <button wire:click="setStep({{ $current + 1 }})" class="cursor-pointer {{ 'bg-emerald-600 px-3 py-2 rounded-md shadow-md text-white font-semibold flex gap-2 ' . ($current === 3 ? 'bg-neutral-300 dark:bg-neutral-700' : 'bg-emerald-600 hover:bg-emerald-500' ) }}">
        <span>{{ __('stepper.next') }}</span>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
    </button>
</div>

