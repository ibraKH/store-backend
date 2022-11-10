SET session_replication_role = 'replica';
DROP TABLE if exists product cascade;
DROP TABLE if exists users cascade;
DROP TABLE if exists orders cascade;
DROP TABLE if exists products_orders cascade;
SET session_replication_role = 'origin';