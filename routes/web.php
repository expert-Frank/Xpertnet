<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\App;

use App\Livewire\Main;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{locale}', Main::class);
