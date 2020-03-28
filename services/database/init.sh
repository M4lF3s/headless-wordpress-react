#!/bin/bash

echo
echo
echo '+-------------------------------------------------+'
echo '| Downloading Wordpress and initializing Database |'
echo '+-------------------------------------------------+'
echo
wp core download --path=/tmp/wordpress
wp core config --path=/tmp/wordpress --dbname=$MYSQL_DATABASE --dbuser=$MYSQL_USER --dbpass=$(cat /run/secrets/db_password)
wp core install --path=/tmp/wordpress --url=$SITEURL --title=$BLOGNAME --admin_user=root --admin_password=$(cat /run/secrets/db_root_password) --admin_email=$ADMINMAIL
echo
echo 'Done.'


echo
echo
echo '+--------------------------------+'
echo '| Removing temporary Directories |'
echo '+--------------------------------+'
echo
rm -rf /home/*
rm -rf /tmp/wordpress
echo
echo 'Done.'