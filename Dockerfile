FROM node:20-alpine AS build

RUN mkdir /build
WORKDIR /build

COPY . .
RUN npm i --legacy-peer-deps
RUN npm run build


FROM php:8.3-fpm

COPY composer.lock composer.json /var/www/
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    libgd-dev \
    nginx \
    sqlite3
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-external-gd
RUN docker-php-ext-install gd

# Copy existing application directory contents
COPY . /var/www
RUN mkdir -p /var/www/public/build
COPY --from=build /build/public/build /var/www/public/build/
COPY nginx.conf /etc/nginx/conf.d/

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

# Create Dummy Database
RUN sqlite3 database/database.sqlite "VACUUM;"
RUN chmod 777 database/database.sqlite

# Add user for laravel application
#RUN groupadd -g 1000 www
#RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory permissions
#COPY --chown=www:www . /var/www

# Change current user to www
#USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["bash", "entrypoint.sh"]
