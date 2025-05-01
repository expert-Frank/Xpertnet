Bestellungsbestätigung

@if($contact['message'] !== "")
Nachricht:
{{ $contact['message'] }}
@endif

Adresse: {{$address['street']}} {{$address['num']}}, {{$address['postal']}} {{$address['place']}}
E-Mail: {{ $contact['email'] }}
Telefon: {{ $contact['phone'] }}

Abonnement:
- Abonnement: {{ $plan['title'] }}
- Preis: {{ $plan['price'] }} CHF / Monat

Router:
- Typ: {{ $router['name'] }}
- Preis: {{ $router['price'] }} CHF

Installation:
- {{ $installation['nameDE'] }}
@if(array_key_exists("price", $installation))
- Preis: {{ $installation['price'] }}
@endif

Statische IP-Adressen:
- Anzahl: {{ $ips['num'] }}
- Preis: {{ $ips['price'] }} CHF / Monat
