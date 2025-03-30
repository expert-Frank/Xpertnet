<div class="my-8 p-6">
    <form wire:submit="submit" class="w-full max-w-[512px] mx-auto text-black dark:text-white grid grid-cols-1 lg:grid-cols-2 gap-4">
        <label class="block w-full">
            <span>{{ __('contact.name')}}</span>
            <input class="p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-lime-400 w-full" wire:model="name"  placeholder="{{ __('contact.name_placeholder') }}" />
            @error('name') <span class="text-red-500 dark:text-red-400 error text-sm block">{{ $message }}</span> @enderror
        </label>
        <label class="block w-full">
            <span>{{ __('contact.email')}}</span>
            <input class="p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-lime-400 w-full" wire:model="email"  placeholder="{{ __('contact.email_placeholder') }}" />
            @error('email') <span class="text-red-500 dark:text-red-400 error text-sm block">{{ $message }}</span> @enderror
        </label>
        <label class="w-full block col-span-1 lg:col-span-2">
            <span>{{ __('contact.message') }}</span>
            <textarea class="block w-full p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-lime-400" wire:model="message" placeholder="{{ __('contact.message_placeholder') }}" rows="5">
            </textarea>
            @error('message') <span class="text-red-500 dark:text-red-400 error text-sm block">{{ $message }}</span> @enderror
        </label>
        <div class="w-full block col-span-1 lg:col-span-2">
            <div class="flex gap-4 items-center my-1">
                <label class="flex items-center cursor-pointer relative">
                    <input wire:model="human" type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-emerald-600 checked:border-emerald-600 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 dark:focus:ring-lime-400" id="human" />
                    <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>
                <label for="human">{{ __('contact.human') }}</label>
                @error('human') <span class="text-red-500 dark:text-red-400 error text-sm block">{{ $message }}</span> @enderror
            </div>
            <div class="flex gap-4 items-center my-1">
                <label class="flex items-center cursor-pointer relative">
                    <input wire:model="robot" type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-emerald-600 checked:border-emerald-600 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 dark:focus:ring-lime-400" id="robot" />
                    <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>
                <label for="robot">{{ __('contact.robot') }}</label>
                @error('robot') <span class="text-red-500 dark:text-red-400 error text-sm block">{{ $message }}</span> @enderror
            </div>
        </div>
        @if($sent === true)
            <div class="alert alert-success block w-full bg-emerald-600/30 rounded-md p-4 mt-4 flex gap-4 items-start">
                <svg class="text-emerald-600" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                {{ __('contact.sent') }}
            </div>
        @endif
        <button class="px-3 py-2 rounded-md bg-emerald-600 text-white font-semibold shadow-md mt-4 flex gap-2 hover:bg-emerald-500 outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 dark:focus:ring-lime-400 w-fit cursor-pointer" type="submit">
            {{ __('contact.submit') }}
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-send-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
        </button>
    </form>
</div>
