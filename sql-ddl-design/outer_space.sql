-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

-- CHANGELOG: Want to reduce duplication of orbits_around and galaxy so I will break those out into seperate tables

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  moons TEXT[]
);

CREATE TABLE orbit_ref (
  id SERIAL PRIMARY KEY,
  orbits_around TEXT NOT NULL
);

CREATE TABLE galaxy_ref (
  id SERIAL PRIMARY KEY,
  galaxy TEXT NOT NULL
);

CREATE TABLE planet_system_data (
  id SERIAL PRIMARY KEY, 
  planet_id INTEGER REFERENCES planets (id),
  orbits_around_id INTEGER REFERENCES orbit_ref (id),
  galaxy_id INTEGER REFERENCES galaxy_ref (id)
);


INSERT INTO planets
  (name, orbital_period_in_years, moons)
VALUES
  ('Earth', 1.00, '{"The Moon"}'),
  ('Mars', 1.88, '{"Phobos", "Deimos"}'),
  ('Venus', 0.62, '{}'),
  ('Neptune', 164.8, '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}'),
  ('Proxima Centauri b', 0.03, '{}'),
  ('Gliese 876 b', 0.23, '{}');


INSERT INTO planet_system_data
  (planet_id, orbits_around_id, galaxy_id)
VALUES
  (1, 1, 1),
  (2, 1, 1),
  (3, 1, 1),
  (4, 1, 1),
  (5, 2, 1),
  (6, 3, 1);

INSERT INTO orbit_ref
  (orbits_around)
VALUES
  ('The Sun'),
  ('Proxima Centauri'),
  ('Gliese 876');

INSERT INTO galaxy_ref
  (galaxy)
VALUES
  ('Milky Way');