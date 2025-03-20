#!/bin/bash

php artisan migrate --force

nginx &
php-fpm
