<?php

namespace App\Livewire;

use Illuminate\Support\Facades\App;
use Livewire\Component;

class Main extends Component
{
    public function mount($locale)
    {
        if (! in_array($locale, ['en', 'de'])) {
            abort(400);
        }

        App::setLocale($locale);
    }

    public function render()
    {
        return view('livewire.main');
    }
}
