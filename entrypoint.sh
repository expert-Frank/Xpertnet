#!/bin/bash

php artisan migrate -n

nginx &
php-fpm
