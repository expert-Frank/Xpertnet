<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Lang;

Route::get('/localization', function (Request $request) {
  $res = [
    "de" => [],
    "en" => [],
  ];

  foreach (glob("../lang/de/*.php") as $filename)
  {
    ob_start();
    include($filename);
    $returned = ob_get_contents();
    ob_end_clean();

    $locale = explode("/", $filename)[2];
    $dict = explode(".", explode("/", $filename)[3])[0];

    $res["de"][$dict] = Lang::get($dict, [], "de");
    $res["en"][$dict] = Lang::get($dict, [], "en");
  }

  return $res;
});

Route::get('/plans', function (Request $request) {
  $plans_config = file_get_contents("../xpertnet-plans.json");
  $json = json_decode($plans_config);

  return $json;
});

Route::get('/extract', function (Request $request) {
  $zip = new \ZipArchive;
  if ($zip->open('/var/www/vhosts/expertfrank.ch/xpertnet.ch/xpertnet.zip') === TRUE) {
    $zip->extractTo('/var/www/vhosts/expertfrank.ch/xpertnet.ch');
    $zip->close();
    return "OK";
  } else {
    return "Error";
  }
});
