-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

-- CHANGELOG - will break out cities, customers, and airlines, so we have just one list of all

CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE airlines (
  id SERIAL PRIMARY KEY,
  airline TEXT NOT NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers (id),
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INTEGER REFERENCES airlines (id),
  from_city_id INTEGER REFERENCES cities (id),
  to_city_id INTEGER REFERENCES cities (id)
);


INSERT INTO cities
(city, country)
VALUES
('St.louis', 'United States'),
('Chicago', 'United States');

INSERT INTO customers (first_name, last_name) VALUES ('Bob', 'Myers');

INSERT INTO airlines (airline) VALUES ('United');

INSERT INTO tickets
  (customer_id, seat, departure, arrival, airline_id, from_city_id, to_city_id)
VALUES
  (1, '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 2);

