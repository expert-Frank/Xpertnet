@props([
    "active" => false,
    "class" => "",
    "click" => "",
    "title" => "",
    "icon" => ""
])

<div class="{{ 'bg-white rounded-md p-4 flex gap-4 items-start transition-all duration-250 ' . $class . ' ' . ($active ? 'border-2 border-lime-600' : 'border-2 border-white') }}" wire:click="{{ $click }}">
    <div class="text-emerald-600">
        {{ $icon }}
    </div>
    <div>
        <h4 class="font-bold text-xl -mt-[2px] mb-2">{{ $title }}</h4>
        <div>
            {{ $slot }}
        </div>
    </div>
</div>
