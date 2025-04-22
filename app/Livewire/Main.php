<?php

namespace App\Livewire;

use Illuminate\Support\Facades\App;
use Livewire\Component;

class Main extends Component
{
    public $about;

    public function mount($locale)
    {
        if (! in_array($locale, ['en', 'de'])) {
            abort(400);
        }

        App::setLocale($locale);

        $config = json_decode(file_get_contents("../xpertnet-config.json"));
        $this->about = $config->about->$locale;
    }

    public function render()
    {
        return view('livewire.main');
    }
}
