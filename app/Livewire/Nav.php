<?php

namespace App\Livewire;

use Illuminate\Support\Facades\App;

use Livewire\Component;

class Nav extends Component
{
    public $locale = "de";
    public $opened = false;

    public function __construct() {
        $this->locale = App::currentLocale();
    }

    public function toggleNav() {
        $this->opened = !$this->opened;
    }

    public function render()
    {
        return view('livewire.nav');
    }
}
