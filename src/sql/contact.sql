DROP TABLE qa_contact;

CREATE SEQUENCE contact_id_seq;

CREATE TABLE qa_contact (
  id INTEGER PRIMARY KEY DEFAULT nextval('contact_id_seq'),
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);