<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

use Inertia\Middleware;

class LocaleMiddleware extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        /*
         * Very basic content negotiation. Loop through the Accept-Language header
         * and check if our supported languages fit it. If nothing fits, return /de.
         */
        $localeHeader = $request->header('Accept-Language', null);
        $langs = array(
            'de-CH',
            'de-DE',
            'de',
            'en-US',
            'en-UK',
            'en'
        );
        $acceptLanguageList = preg_replace('/;q=0\../', '', $localeHeader);
        foreach(explode(",", $acceptLanguageList) as $lang) {
            if(in_array($lang, $langs)) {
                $lang_condensed = substr($lang, 0, 2);
                return redirect('/' . $lang_condensed);
            }
        }

        return redirect('/de');
    }
}
