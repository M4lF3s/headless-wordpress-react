#FROM wordpress:cli-php7.3
FROM wordpress:latest as dev

RUN apt-get update \
    && apt-get install -y curl mariadb-client

WORKDIR /var/www/html

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /tmp/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN a2enmod rewrite expires

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait


ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["apache2-foreground"]


# Run build script
FROM dev as build

COPY wptheme /var/www/html/wp-content/themes/


# Create Production Image
FROM nginx:latest as prod

# TODO: Copy built project and run nginx