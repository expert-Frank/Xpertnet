<?php

namespace App\Livewire;

use Illuminate\Support\Facades\App;

use Livewire\Component;

class Nav extends Component
{
    public $locale = "de";

    public function __construct() {
        $this->locale = App::currentLocale();
    }

    public function render()
    {
        return view('livewire.nav');
    }
}
