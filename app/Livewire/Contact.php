<?php

namespace App\Livewire;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

use Livewire\Attributes\Validate;
use Livewire\Component;

use App\Mail\ContactForm;

class Contact extends Component
{
    #[Validate('required')]
    public $name = "";
    #[Validate('required|email')]
    public $email = "";
    #[Validate('required')]
    public $message = "";
    #[Validate('accepted')]
    public $human = false;
    #[Validate('declined')]
    public $robot = false;
    public $sent = false;

    public function submit()
    {
        $this->validate();

        Mail::to(env('MAIL_RECEIVER', ''))->send(new ContactForm($this->name, $this->email, $this->message));

        Log::info('Contact form from ' . $this->name . ' <' . $this->email . '> sent to ' . env('MAIL_RECEIVER', '[not supplied]'));

        $this->name = "";
        $this->email = "";
        $this->message = "";
        $this->human = false;
        $this->robot = false;

        $this->sent = true;
    }

    public function render()
    {
        return view('livewire.contact');
    }
}
