CREATE TABLE IF NOT EXISTS authors (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors (id)
);

-- Seed
INSERT INTO
  authors (name)
VALUES
  ('J.K. Rowling'),
  ('George R.R. Martin'),
  ('J.R.R. Tolkien'),
  ('Stephen King'),
  ('Agatha Christie');

INSERT INTO
  books (title, author_id)
VALUES
  ('Harry Potter and the Philosopher''s Stone', 1),
  ('Harry Potter and the Chamber of Secrets', 1),
  ('Harry Potter and the Prisoner of Azkaban', 1),
  ('Harry Potter and the Goblet of Fire', 1),
  ('A Game of Thrones', 2),
  ('A Clash of Kings', 2),
  ('A Storm of Swords', 2),
  ('A Feast for Crows', 2),
  ('The Fellowship of the Ring', 3),
  ('The Two Towers', 3),
  ('The Return of the King', 3),
  ('The Hobbit', 3),
  ('The Shining', 4),
  ('It', 4),
  ('Carrie', 4),
  ('Misery', 4),
  ('And Then There Were None', 5),
  ('Murder on the Orient Express', 5),
  ('The Murder of Roger Ackroyd', 5),
  ('Death on the Nile', 5);
