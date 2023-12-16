FROM mysql:8.0

COPY ./seed.sql /tmp

CMD [ "mysqld", "--init-file=/tmp/seed.sql" ]