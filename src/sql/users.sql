DROP TABLE qa_users;

CREATE SEQUENCE users_id_seq;

CREATE TABLE qa_users (
  id INTEGER PRIMARY KEY DEFAULT nextval('users_id_seq'),
  credits INTEGER DEFAULT 0,
  username VARCHAR(32),
  email_address VARCHAR(32) NOT NULL,
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  gender VARCHAR(8),
  clerk_id VARCHAR(32) NOT NULL,
  clerk_created_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
