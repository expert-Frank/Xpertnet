<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\App;

use App\Livewire\Main;
use App\Http\Middleware\LocaleMiddleware;
use App\Http\Controllers\ExtractController;

Route::get('/', function () {})->middleware(LocaleMiddleware::class);

Route::get('/extract', [ExtractController::class, 'extract']);

Route::get('/{locale}', Main::class);
