FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y apache2 curl openssl

ADD ssl/sbremit.key /etc/ssl/private/sbremit.key
ADD ssl/sbremit_com.* /etc/ssl/certs/

COPY vhost.conf /etc/apache2/sites-available/000-default.conf
RUN rm -rf /var/www/html/*
COPY ./build /var/www/html

RUN a2enmod rewrite headers ssl

ENV APACHE_RUN_DIR /var/www
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

EXPOSE 80

CMD ["/usr/sbin/apache2", "-D", "FOREGROUND"]
