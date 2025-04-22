<footer class="inset-shadow-emerald-600/30 inset-shadow-sm px-6 py-12">
  <div class="max-w-[1200px] mx-auto">
    <div class="flex gap-4 items-start text-black dark:text-neutral-100 group">
      <img src="/img/pentagon.svg" class="w-10 group-hover:rotate-72 duration-250 drop-shadow-lg" />
      <h2 class="font-bold text-3xl lg:text-5xl mt-0 lg:-mt-2">
        {{ __('imprint.about') }}
      </h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-4 align-end">
      <div class="h-full flex flex-col justify-end">
        <img src="Xpertnet_logo_nopadding.svg" class="w-full" />
      </div>
      <div class="h-full flex flex-col justify-end">
        @foreach($about as $aboutRow)
          <p class="my-1">{{ $aboutRow }}</p>
        @endforeach
      </div>
      <div class="h-full flex flex-col justify-end">
        <h3 class="font-bold">{{ __('imprint.imprint') }}</h3>
        <ul>
          <li>expert Frank GmbH</li>
          <li>Riedstrasse 4, 8824 Schönenberg</li>
          <li><a href="mailto:info@xpertnet.ch" class="underline">info@xpertnet.ch</a></li>
          <li><a href="tel:0446461030" class="underline">044 686 10 30</a></li>
          <li>CHE-256.785.816</li>
        </ul>

        <h3 class="font-bold mt-4">{{ __('imprint.aboutWebsite') }}</h3>
        <ul>
          <li>© {{ date('Y') }}, expert Frank GmbH</li>
          <li>
            {{ __('imprint.createdByBefore', ["heart" => "💚"]) }}
            <a href="https://aschoch.ch" target="_blank" class="underline">Alexander Schoch</a>
            {{ __('imprint.createdByAfter', ["heart" => "💚"]) }}
          </li>
          <li><a href="https://github.com/expert-frank/Xpertnet" target="_blank" class="underline">{{ __('imprint.source') }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
