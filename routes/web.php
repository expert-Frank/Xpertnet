<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\App;

use App\Livewire\Main;
use App\Http\Middleware\LocaleMiddleware;

Route::get('/', function () {})->middleware(LocaleMiddleware::class);

Route::get('/{locale}', Main::class);
