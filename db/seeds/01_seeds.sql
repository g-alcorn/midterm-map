-- Users table seeds here (Example)
INSERT INTO users (name, email, password, account_created)
VALUES
('Olivier Carignan', 'olive.carignan@gmail.com', '123', now()),
('Griffin Alcorn', 'griffin.alcorn@gmail.com', '123', now()),
('Lighthouse', 'labber@lighthouselabs.com', '123', now());

INSERT INTO maps (user_id, title, description, location)
VALUES
('1', 'My First Map', 'this is my first map to test our app', '/testMap.geojson'),
('2', 'My Second Map', 'this is another test', '/testMap.geojson');
