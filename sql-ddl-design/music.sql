-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

-- CHANGELOG - breakout artist, album, and producer into seperate tables

\c music

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  artist TEXT NOT NULL
);

CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  album TEXT NOT NULL,
  artist_id INTEGER REFERENCES artists (id) 
);

CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  producer TEXT NOT NULL
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  primary_artist_id INTEGER REFERENCES artists (id), 
  secondary_artist_id INTEGER REFERENCES artists (id), 
  album_id INTEGER REFERENCES albums (id), 
  primary_producer_id INTEGER REFERENCES producers (id),
  secondary_producer_id INTEGER REFERENCES producers (id)  
);


INSERT INTO artists (artist) VALUES ('Hanson'), ('Cher');

INSERT INTO albums (album, artist_id) VALUES ('Tonight is the Night', 1), ('Album Name Two', 2);

INSERT INTO producers (producer) VALUES ('Producer1'), ('Producter2');

INSERT INTO songs
  (title, duration_in_seconds, release_date, primary_artist_id, secondary_artist_id, album_id, primary_producer_id, secondary_producer_id)
VALUES
  ('MMMBop', 238, '04-15-1997', 1, 2, 1, 1, 2);


-- INSERT INTO songs
--   (title, duration_in_seconds, release_date, artists, album, producers)
-- VALUES
--   ('MMMBop', 238, '04-15-1997', '{"Hanson"}', 'Middle of Nowhere', '{"Dust Brothers", "Stephen Lironi"}'),
--   ('Bohemian Rhapsody', 355, '10-31-1975', '{"Queen"}', 'A Night at the Opera', '{"Roy Thomas Baker"}'),
--   ('One Sweet Day', 282, '11-14-1995', '{"Mariah Cary", "Boyz II Men"}', 'Daydream', '{"Walter Afanasieff"}'),
--   ('Shallow', 216, '09-27-2018', '{"Lady Gaga", "Bradley Cooper"}', 'A Star Is Born', '{"Benjamin Rice"}'),
--   ('How You Remind Me', 223, '08-21-2001', '{"Nickelback"}', 'Silver Side Up', '{"Rick Parashar"}'),
--   ('New York State of Mind', 276, '10-20-2009', '{"Jay Z", "Alicia Keys"}', 'The Blueprint 3', '{"Al Shux"}'),
--   ('Dark Horse', 215, '12-17-2013', '{"Katy Perry", "Juicy J"}', 'Prism', '{"Max Martin", "Cirkut"}'),
--   ('Moves Like Jagger', 201, '06-21-2011', '{"Maroon 5", "Christina Aguilera"}', 'Hands All Over', '{"Shellback", "Benny Blanco"}'),
--   ('Complicated', 244, '05-14-2002', '{"Avril Lavigne"}', 'Let Go', '{"The Matrix"}'),
--   ('Say My Name', 240, '11-07-1999', '{"Destiny''s Child"}', 'The Writing''s on the Wall', '{"Darkchild"}');
