-- MEDICAL CENTER
CREATE DATABASE medical_center_db;

\c medical_center_db;

CREATE TABLE medical_center (
    id SERIAL PRIMARY KEY,
    center_name TEXT
)

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    doctor_name TEXT,
    medical_center_id, INTEGER REFERENCES medical_center (id)
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    patient_name TEXT, 
    insurance TEXT
)

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES doctors (id),
    patient_id INTEGER REFERENCES patient (id),
    date DATE
)

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    type TEXT
)

CREATE TABLE diagnoses (
    id SERIAL PRIMARY KEY,
    visit_id INTEGER REFERENCES visits (id),
    disease_id INTEGER REFERENCES diseases (id),
    notes TEXT
)

-- CRAIGLIST SCHEMA:
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    region TEXT
)

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category TEXT
)

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT,
    prefered_region_id INTEGER REFERENCES regions (id)
)

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    location TEXT,
    user_id INTEGER REFERENCES users (id),
    regions_id INTEGER REFERENCES regions (id),
    category_id INTEGER REFERENCES categories (id)
)

-- SOCCER 
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name TEXT
)

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    name TEXT
)

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    team_id INTEGER REFERENCES teams (id)
)

CREATE TABLE standings (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams (id),
    rank UNIQUE
)

CREATE TABLE match_date (
    id SERIAL PRIMARY KEY,
    start_date DATETIME,
    end_date DATETIME
)

CREATE TABLE match (
    id SERIAL PRIMARY KEY,
    location TEXT,
    start_time TIMESTAMP,
    home_team_id INTEGER REFERENCES team (id),
    away_team_id INTEGER REFERENCES team (id),
    season_id INTEGER REFERENCES match_date (id),
    head_referee_id INTEGER REFERENCES referees (id)
)

CREATE TABLE lineup (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players (id),
    match_id INTEGER REFERENCES match (id),
    team_id INTEGER REFERENCES team (id)
)

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    goal_count INTEGER,
    player_id INTEGER REFERENCES player (id),
    match_id INTEGER REFERENCES match (id)
)



