<?php

namespace App\Livewire;

use Illuminate\Support\Facades\App;

use Livewire\Component;

class Nav extends Component
{
  public $locale = "de";
  public $opened = false;
  public $navItems = [];
  public $navItemsJson = "";
  public $imprint = [];
  public $imprintJson = "";

  public function __construct() {
    $this->locale = App::currentLocale();

    $this->navItems = [
      [
        "label" => __("steps.title"),
        "anchor" => "#steps"
      ],
      [
        "label" => __("stepper.title"),
        "anchor" => "#stepper"
      ],
      [
        "label" => __("contact.title"),
        "anchor" => "#contact"
      ],
      [
        "label" => __("imprint.about"),
        "anchor" => "#about"
      ]
    ];

    $this->navItemsJson = json_encode($this->navItems);

    $this->imprint = [
      "copyright" => [
        "year" => date("Y"),
        "author" => "Xpertnet",
        "place" => "8824 Schönenberg ZH"
      ],
      "source" => [
        "label" => __("messages.source"),
        "url" => "https://github.com/expert-Frank/Xpertnet"
      ],
      "author" => [
        "name" => "Alexander Schoch",
        "url" => "https://aschoch.ch",
        "label" => __("messages.createdBy")
      ]
    ];

    $this->imprintJson = json_encode($this->imprint);
  }

  public function toggleNav() {
    $this->opened = !$this->opened;
  }

  public function render()
  {
    return view('livewire.nav');
  }
}
