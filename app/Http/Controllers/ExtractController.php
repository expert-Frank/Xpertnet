<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExtractController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function extract(Request $request)
    {
        $zip = new \ZipArchive;
        if ($zip->open('/var/www/vhosts/expertfrank.ch/xpertnet.ch/xpertnet.zip') === TRUE) {
            $zip->extractTo('/var/www/vhosts/expertfrank.ch/xpertnet.ch');
            $zip->close();
            return "OK";
        } else {
            return "Error";
        }
    }
}
