Neue Bestellung von {{ $contact['name'] }}

@if($contact['message'] !== "")
Nachricht:
{{ $contact['message'] }}
@endif

Adresse: {{$address['street']}} {{$address['num']}}, {{$address['postal']}} {{$address['place']}}
E-Mail: {{ $contact['email'] }}
Telefon: {{ $contact['phone'] }}

Plan:
{{ $plan }}

Router:
{{ $router }}

Installation:
{{ $installation }}

Statische IP-Adressen:
{{ $ips }}
