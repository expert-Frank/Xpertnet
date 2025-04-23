<?php

namespace App\Livewire;

use Illuminate\Support\Facades\App;
use Livewire\Component;

use Alfrasc\MatomoTracker\Facades\LaravelMatomoTracker;

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

        LaravelMatomoTracker::doTrackPageView("Main Page (" . $locale . ")");
    }

    public function render()
    {
        return view('livewire.main');
    }
}
