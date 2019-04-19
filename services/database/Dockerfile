FROM mariadb:latest

RUN apt-get update
RUN apt-get install -y curl php php-mysql sendmail
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp-cli.phar
RUN chown mysql:mysql /home
RUN mv wp-cli.phar /usr/local/bin/wp
RUN wp cli update --allow-root