CREATE TABLE koalas(
id serial primary key,
name varchar(30),
sex varchar(30),
age int,
ready_to_transfer varchar(1),
notes varchar(120)
);

INSERT INTO koalas (name, sex, age, ready_to_transfer, notes)
VALUES ('Scotty', 'M', 4, 'Y','Born in Guatemala'),
('Jean','F', 5,'Y', 'Allergic to lots of lava'),
('Ororo', 'F', 7, 'N', 'Loves listening to Paula (Abdul)'),
('Logan','M',15 ,'N', 'Loves the sauna'),
('Charlie','M',9 ,'Y', 'Favorite band is Nirvana'),
('Betsy', 'F',4, 'Y', 'She has a pet iguana');
