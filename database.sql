-- Use this file to share any SQL scripts the user may need

-- Scripts for example database
CREATE TABLE example (
	id SERIAL PRIMARY KEY,
	integer INT,
	string VARCHAR(50) NOT NULL
)
;

INSERT INTO example (integer, string)
VALUES 
	(20, 'twenty'),
	(5, 'five'),
	(100, 'one hundred'),
	(444, 'four hundred forty four')
;