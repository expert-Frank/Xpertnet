<section class="w-full flex relative overflow-hidden gap-8 shadow-md" id="steps">
    <div class="flex-1 relative w-full flex flex-col justify-between hidden lg:block">
        <div></div>
        <div></div>
        @for($i = 4; $i > 0; $i--)
            <div class="object-cover h-full w-full absolute" id="pentagons-{{ $i }}"></div>
        @endfor
        <div class="h-full w-full object-cover bg-neutral-100/50 dark:bg-neutral-800/50 absolute blur-lg"></div>
    </div>
    <div class="flex-1 ml-auto text-black dark:text-neutral-100 px-6">
        <div class="border-l-4 pl-4 border-emerald-700 ml-4 py-24">
            <div class="flex gap-4 -ml-[38px] items-start">
                <img src="/img/pentagon.svg" class="w-10 hover:rotate-72 duration-250 drop-shadow-lg" />
                <h2 class="font-bold text-3xl lg:text-5xl mt-0 lg:-mt-2">
                    {{ __('steps.title') }}
                </h2>
            </div>
            <div class="py-4"></div>
            <x-steps-entry num="1" title="{{ __('steps.availabilityT') }}">
                <p>{{ __('steps.availabilityD') }}</p>
            </x-steps-entry>
            <x-steps-entry num="2" title="{{ __('steps.chooseT') }}">
                <p>{{ __('steps.chooseD') }}</p>
            </x-steps-entry>
            <x-steps-entry num="3" title="{{ __('steps.routerT') }}">
                <p>{{ __('steps.routerD') }}</p>
            </x-steps-entry>
            <x-steps-entry num="4" title="{{ __('steps.setupT') }}">
                <div class="flex gap-4 flex-wrap">
                    {{--<div class="p-4 dark:bg-neutral-700 w-full max-w-96 rounded-md bg-neutral-200">
                        <h4 class="font-semibold mb-2">{{ __("steps.setupEasyT") }}</h4>
                        <p>{{ __("steps.setupEasyD") }}</p>
                    </div>--}}
                    <div class="p-4 dark:bg-neutral-700 w-full max-w-96 rounded-md bg-neutral-200">
                        <h4 class="font-semibold mb-2">{{ __("steps.installationSelfT") }}</h4>
                        <p>{{ __("steps.installationSelfD") }}</p>
                    </div>
                    <div class="p-4 dark:bg-neutral-700 w-full max-w-96 rounded-md bg-neutral-200">
                        <h4 class="font-semibold mb-2">{{ __("steps.installationProT") }}</h4>
                        <p>{{ __("steps.installationProD") }}</p>
                    </div>
                    <div class="p-4 dark:bg-neutral-700 w-full max-w-96 rounded-md bg-neutral-200">
                        <h4 class="font-semibold mb-2">{{ __("steps.setupComplexT") }}</h4>
                        <p>{{ __("steps.setupComplexD") }}</p>
                    </div>
                </div>
            </x-steps-entry>
        </div>
    </div>
</section>
