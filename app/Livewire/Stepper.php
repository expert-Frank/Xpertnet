<?php

namespace App\Livewire;

use Illuminate\Support\Facades\App;

use Livewire\Attributes\Validate;
use Livewire\Component;

class Stepper extends Component
{
    public $step = 2;
    public $router = "steps.routerVDSL5530";
    public $product = "steps.chooseOptionVDSLHome";

    #[Validate('required')]
    public $street = "";
    #[Validate('required')]
    public $number = "";
    #[Validate('required|min:4|max:4')]
    public $postal = "";
    #[Validate('required')]
    public $place = "";

    public $products = array(
        [
            'title' => 'steps.chooseOptionVDSLHome',
            'desc' => 'steps.chooseOptionVDSLHomeD',
            'icon' => 'icons.home'
        ],
        [
            'title' => 'steps.chooseOptionVDSLBusiness',
            'desc' => 'steps.chooseOptionVDSLBusinessD',
            'icon' => 'icons.business'
        ],
        [
            'title' => 'steps.chooseOptionFiberHome',
            'desc' => 'steps.chooseOptionFiberHomeD',
            'icon' => 'icons.home'
        ],
        [
            'title' => 'steps.chooseOptionFiberBusiness',
            'desc' => 'steps.chooseOptionFiberBusinessD',
            'icon' => 'icons.business'
        ],
    );

    public $routers = array(
        [
            'name' => 'steps.routerVDSL5530',
            'desc' => 'steps.routerVDSL5530D',
            'icon' => 'icons.router'
        ],
        [
            'name' => 'steps.routerVDSL7530',
            'desc' => 'steps.routerVDSL7530D',
            'icon' => 'icons.router'
        ],
        [
            'name' => 'steps.routerxDSL7530AX',
            'desc' => 'steps.routerxDSL7530AXD',
            'icon' => 'icons.router'
        ]
    );

    public $addressFields = array(
        [
            'label' => 'steps.street',
            'placeholder' => 'steps.streetPlaceholder',
            'class' => 'basis-2/3',
            'var' => 'street'
        ],
        [
            'label' => 'steps.number',
            'placeholder' => 'steps.numberPlaceholder',
            'class' => 'basis-1/3',
            'var' => 'number'
        ],
        [
            'label' => 'steps.postal',
            'placeholder' => 'steps.postalPlaceholder',
            'class' => 'basis-1/3',
            'var' => 'postal'
        ],
        [
            'label' => 'steps.place',
            'placeholder' => 'steps.placePlaceholder',
            'class' => 'basis-2/3',
            'var' => 'place'
        ],
    );

    public function setStep($which)
    {
        if($which < 0) return;
        if($which > 3) return;
        $this->step = $which;
    }

    public function setProduct($product)
    {
        if($product === null) return;
        $this->product = $product;
    }

    public function setRouter($router)
    {
        if($router === null) return;
        $this->router = $router;
    }

    public function checkAvailability()
    {
        $this->validate();

        $locale = App::currentLocale();
        error_log($locale);

        $res = get_file_contents("https://checker.vadian.net/start.aspx");
    }

    public function render()
    {
        return view('livewire.stepper');
    }
}
