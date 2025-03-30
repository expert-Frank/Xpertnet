<div>
    <div class="flex gap-4 flex-col lg:flex-row p-6 max-w-[1200px] mx-auto my-24">
        <div class="flex-none">
            <x-stepper-header-element num=0 title="{{ __('steps.chooseT') }}" desc="{{ __('steps.chooseD') }}" current="{{ $step }}" />
            <x-stepper-header-element num=1 title="{{ __('steps.routerT') }}" desc="{{ __('steps.routerD') }}" current="{{ $step }}" />
            <x-stepper-header-element num=2 title="{{ __('steps.availabilityT') }}" desc="{{ __('steps.availabilityD') }}" current="{{ $step }}" />
            <x-stepper-header-element num=3 title="{{ __('steps.setupT') }}" desc="{{ __('steps.setupD') }}" current="{{ $step }}" />
        </div>
        <div class="flex-1 flex flex-col gap-4">
            <div class="flex-1">
                <x-stepper-content :current="$step" :$product :$products :$router :$routers :$addressFields />
            </div>
            <x-stepper-controls :current="$step" />
        </div>
    </div>
</div>
