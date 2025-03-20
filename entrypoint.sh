#!/bin/bash

php artisan migrate

nginx &
php-fpm
