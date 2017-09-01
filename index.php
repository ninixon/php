
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/5/28
 * Time: 18:23
 */
echo phpinfo();
server {
    listen 80;
    server_name php128.top;
    root /var/www/blog;

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log /data/log/nginx/test-access.log;
    error_log  /data/log/nginx/test-error.log error;

    sendfile off;

    client_max_body_size 100m;

    include fastcgi.conf;

    location ~ /\.ht {
        deny all;
    }

    location ~ \.php$ {
    fastcgi_pass   127.0.0.1:9000;
        #fastcgi_pass /run/php/php7.0-fpm.sock;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}


server {

    listen 80 default_server;

    listen [::]:80 default_server ipv6only=on;

    root /var/www;

    index index.php index.html index.htm;

    server_name test.php128.top;

    location / {

        try_files $uri $uri/ /index.php?$query_string;

    }

    location ~ \.php$ {

        try_files $uri /index.php =404;

        fastcgi_split_path_info ^(.+\.php)(/.+)$;

        fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;

        fastcgi_index index.php;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

        include fastcgi_params;

    }

}
$ssh-keygen -t rsa -C "php126.com"