<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Lang;

use App\Mail\Order;

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

Route::get('/config', function (Request $request) {
  $plans_config = file_get_contents("../xpertnet-config.json");
  $json = json_decode($plans_config);
  $field = $request->field;

  if(!$field) {
    return $json;
  }

  return $json->$field;
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

Route::post('/order', function (Request $request) {
  $address = $request->address;
  $plan = $request->plan;
  $ips = $request->ips;
  $router = $request->router;
  $contact = $request->contact;

  unset($plan['descriptionDE']);
  unset($plan['descriptionEN']);
  unset($plan['availability']);
  unset($plan['available']['Id']);
  unset($plan['available']['ProductCatalogCode']);

  unset($router['descriptionDE']);
  unset($router['descriptionEN']);

  $plan_json = json_encode($plan, JSON_PRETTY_PRINT);
  $ips_json = json_encode($ips, JSON_PRETTY_PRINT);
  $router_json = json_encode($router, JSON_PRETTY_PRINT);

  Mail::to(env('MAIL_RECEIVER', ''))->send(new Order($address, $plan_json, $ips_json, $router_json, $contact));
  Log::info('Order from ' . $contact['name'] . ' <' . $contact['email'] . '> sent to ' . env('MAIL_RECEIVER', '[not supplied]'));

  return "OK";
});
