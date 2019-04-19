#!/bin/bash

/wait
echo
echo
echo '+-----------------------------+'
echo '| Generating Wordpress Config |'
echo '+-----------------------------+'
echo
wp core config --path=/usr/src/wordpress --skip-check --dbname=$WORDPRESS_DB_NAME --dbuser=$WORDPRESS_DB_USER --dbpass=$(cat /run/secrets/db_password) --dbhost=db --allow-root --extra-php <<PHP
define('FORCE_SSL_LOGIN', true);
define('FORCE_SSL_ADMIN', true);
if (strpos(\$_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false)
       \$_SERVER['HTTPS']='on';
PHP
echo
echo 'Done.'


echo
echo
echo '+------------------------------------+'
echo '| Copying Wordpress to /var/www/html |'
echo '+------------------------------------+'
echo
cp -r /usr/src/wordpress/* /var/www/html
cat > /var/www/html/.htaccess <<-'EOF'
				# BEGIN WordPress
				SetEnvIf X-Forwarded-Proto https HTTPS
				<IfModule mod_rewrite.c>
				RewriteEngine On
				RewriteBase /
				RewriteRule ^index\.php$ - [L]
				RewriteCond %{REQUEST_FILENAME} !-f
				RewriteCond %{REQUEST_FILENAME} !-d
				RewriteRule . /index.php [L]
				</IfModule>
				# END WordPress
EOF
chown root:root -R /var/www/html
chown www-data:www-data /var/www/html/wp-content
echo
echo 'Done.'


echo
echo
echo '+------------------+'
echo '| Activating Theme |'
echo '+------------------+'
echo
wp theme activate wptheme --path=/var/www/html --allow-root
echo
echo 'Done.'

exec "$@"