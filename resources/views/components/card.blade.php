@props([
    "active" => false,
    "class" => "",
    "click" => "",
    "title" => "",
    "icon" => ""
])

<button class="{{ 'text-left bg-white cursor-pointer dark:bg-neutral-700 text-black dark:text-neutral-100 rounded-md p-4 flex gap-4 items-start transition-all duration-250 border-2 ' . $class . ' ' . ($active ? 'border-lime-600 dark:border-lime-600' : 'border-white dark:border-neutral-700') }}" wire:click="{{ $click }}">
    <div class="text-emerald-600">
        {{ $icon }}
    </div>
    <div>
        <h4 class="font-bold text-xl -mt-[2px] mb-2">{{ $title }}</h4>
        <div>
            {{ $slot }}
        </div>
    </div>
</button>
