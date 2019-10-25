-- Users table seeds here (Example)
INSERT INTO users (email, password)
VALUES
('olive.carignan@gmail.com', '$2b$12$yM9XiTNFJ3n602B5zcyAJuEtJlSvmUAtZAs81d0M9uSe8tYXukvdu'),
('griffin.alcorn@gmail.com', '123'),
('labber@lighthouselabs.com', '123');

INSERT INTO maps (user_id, title, description, location)
VALUES
('1', 'My First Map', 'this is my first map to test our app', 'testMap.geojson'),
('2', 'My Second Map', 'this is another test', 'testMap2.geojson');
