<div class="w-full flex relative overflow-hidden gap-8">
    <!--<div class="absolute">
        <img src="/img/pentagons.svg" class="h-full absolute" />
        <img src="/img/pentagons.svg" class="rotate-180 h-full absolute blur-lg" />
    </div>-->
    <div class="flex-1 relative mt-8 w-full flex flex-col justify-between hidden lg:block">
        <div></div>
        <div></div>
        <img src="/img/pentagons.svg" class="object-cover h-full w-full rotate-180 blur-xl absolute" />
        <img src="/img/pentagons-3.svg" class="object-cover h-full w-full blur-md absolute" />
        <img src="/img/pentagons-2.svg" class="object-cover h-full w-full blur-sm absolute" />
        <img src="/img/pentagons.svg" class="object-cover w-full h-full absolute" />
    </div>
    <div class="flex-1 ml-auto text-black dark:text-neutral-100 p-4">
        <div class="border-l-4 p-4 border-emerald-700 ml-4">
            <x-steps-entry num="1" title="{{ __('steps.chooseT') }}">
                <p>{{ __('steps.chooseD') }}</p>
            </x-steps-entry>
            <x-steps-entry num="2" title="{{ __('steps.routerT') }}">
                <p>{{ __('steps.routerD') }}</p>
            </x-steps-entry>
            <x-steps-entry num="3" title="{{ __('steps.availabilityT') }}">
                <p>{{ __('steps.availabilityD') }}</p>
            </x-steps-entry>
            <x-steps-entry num="4" title="{{ __('steps.setupT') }}">
                <div class="flex gap-4 flex-wrap">
                    <div class="p-4 shadow-md dark:shadow-none dark:bg-neutral-700 w-full max-w-96 rounded-md shadow-emerald-500/50 shadow-lg">
                        <h4 class="font-semibold mb-2">{{ __("steps.setupEasyT") }}</h4>
                        <p>{{ __("steps.setupEasyD") }}</p>
                    </div>
                    <div class="p-4 shadow-md dark:shadow-none dark:bg-neutral-700 w-full max-w-96 rounded-md shadow-emerald-500/50 shadow-lg">
                        <h4 class="font-semibold mb-2">{{ __("steps.setupComplexT") }}</h4>
                        <p>{{ __("steps.setupComplexD") }}</p>
                    </div>
                </div>
            </x-steps-entry>
            <x-steps-entry num="5" title="{{ __('steps.installationT') }}">
                <div class="flex gap-4 flex-wrap">
                    <div class="p-4 shadow-md dark:shadow-none dark:bg-neutral-700 w-full max-w-96 rounded-md shadow-emerald-500/50 shadow-lg">
                        <h4 class="font-semibold mb-2">{{ __("steps.installationSelfT") }}</h4>
                        <p>{{ __("steps.installationSelfD") }}</p>
                    </div>
                    <div class="p-4 shadow-md dark:shadow-none dark:bg-neutral-700 w-full max-w-96 rounded-md shadow-emerald-500/50 shadow-lg">
                        <h4 class="font-semibold mb-2">{{ __("steps.installationProT") }}</h4>
                        <p>{{ __("steps.installationProD") }}</p>
                    </div>
                </div>
            </x-steps-entry>
        </div>
    </div>
</div>
