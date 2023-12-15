show databases;

-- create database mydb;

use mydb;

create table mytable (id int, name text);

insert into mytable (id, name) values (1, "a");
insert into mytable (id, name) values (2, "b");
insert into mytable (id, name) values (3, "c");
insert into mytable (id, name) values (4, "d");

select * from mytable;