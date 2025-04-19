<div class="text-black dark:text-neutral-100">
    @if ($current === 0)
        <div class="basis-1/3 basis-2/3 hidden"></div>
        <form wire:submit="checkAvailability" class="flex flex-wrap w-full">
            @foreach($addressFields as $af)
                <label class="{{ 'p-2 ' . $af['class'] }}">
                    <span>{{ __($af['label']) }}</span>
                    <input type="text" wire:model="{{ $af['var'] }}" class="p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-lime-400 w-full" placeholder="{{ __($af['placeholder']) }}" />
                    @error($af['var']) <span class="text-red-500 error">{{ $message }}</span> @enderror
                </label>
            @endforeach
            <div class="p-2 basis-1">
                <button class="px-3 py-2 rounded-md bg-emerald-600 text-white font-semibold shadow-md mt-4 flex gap-2 hover:bg-emerald-500 outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 dark:focus:ring-lime-400 w-fit cursor-pointer col-span-1 lg:col-span-2" type="submit">
                    <svg wire:loading.remove xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    <div wire:loading class="animate-spin">
                        <x-icons.loader />
                    </div>
                    {{ __('steps.search') }}
                </button>
            </div>
        </form>
    @elseif ($current === 1)
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <p class="text-center italic">{{ __('steps.chooseForHome') }}</p>
            <p class="text-center italic">{{ __('steps.chooseForBusiness') }}</p>
            {{ $response }}
        </div>
        {{--<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <p class="text-center italic">{{ __('steps.chooseForHome') }}</p>
            <p class="text-center italic">{{ __('steps.chooseForBusiness') }}</p>
            @foreach ($products as $p)
                <x-card :active="$product === $p['title']" :title="__($p['title'])" click="setProduct('{{ $p['title'] }}')" class="{{ 'cursor-pointer' . ($product === $p['title'] ? '' : 'hover:border-emerald-600/30') }}">
                    <x-slot:icon>
                        @if ($p['icon'] === 'icons.home')
                            <x-icons.home />
                        @else
                            <x-icons.factory />
                        @endif
                    </x-slot>

                    <p>{{ __($p['desc']) }}</p>
                </x-card>
            @endforeach
        </div>--}}
    @elseif ($current === 2)
        <p class="font-bold mb-2">{{ __('steps.routerFritz') }}</p>
        <p class="italic mb-2">{{ __('steps.routerFritzD') }}</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            @foreach ($routers as $r)
                <x-card :active="$router === $r['name']" :title="__($r['name'])" click="setRouter('{{ $r['name'] }}')" class="{{ 'cursor-pointer' . ($router === $r['name'] ? '' : 'hover:border-emerald-600/30') }}">
                    <x-slot:icon>
                        @if ($r['icon'] === 'icons.router')
                            <x-icons.router />
                        @endif
                    </x-slot>

                    <p>{{ __($r['desc']) }}</p>
                </x-card>
            @endforeach
        </div>
    @endif
</div>
