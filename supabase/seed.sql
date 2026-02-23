-- Seed data for Doña Obra

-- Insert providers
INSERT INTO providers (name, avatar_url, rating, review_count, location, categories, price_min, price_max, whatsapp, phone, description, services, availability, years_experience, photos, dona_obra_comment) VALUES

-- Plomería (Plumbing)
(
  'Roberto Méndez',
  'https://ui-avatars.com/api/?name=Roberto+Mendez&background=25D366',
  4.9,
  143,
  'El Cangrejo',
  ARRAY['plomería'],
  30,
  300,
  '+507 6234-5678',
  '+507 234-5678',
  'Roberto es el mejor plomero que conozco. Tiene casi 20 años arreglando tuberías en todo Panamá. Nunca deja un trabajo a medias y siempre llega puntual.',
  ARRAY['Reparación de fugas', 'Instalación de tuberías', 'Destapado de drenajes', 'Reparación de calentadores'],
  'Lunes a Sábado, 7AM-6PM',
  18,
  ARRAY['https://picsum.photos/seed/roberto1/400/300', 'https://picsum.photos/seed/roberto2/400/300'],
  'Este man es una joya. Yo lo llamo pa' todo lo de plomería y nunca me ha fallado. Es honesto con los precios y trabaja limpio.'
),
(
  'Carlos Pinzón',
  'https://ui-avatars.com/api/?name=Carlos+Pinzon&background=0088cc',
  4.7,
  98,
  'San Francisco',
  ARRAY['plomería'],
  35,
  250,
  '+507 6345-6789',
  '+507 345-6789',
  'Carlos se especializa en problemas complejos de plomería. Si tu casa tiene una fuga que nadie encuentra, llama a Carlos.',
  ARRAY['Detección de fugas ocultas', 'Reparación de sistemas', 'Instalación de bombas'],
  'Lunes a Viernes, 8AM-5PM',
  12,
  ARRAY['https://picsum.photos/seed/carlos1/400/300', 'https://picsum.photos/seed/carlos2/400/300'],
  'Carlos es más caro que otros pero vale cada centavo. Es como un detective de tuberías, encuentra el problema al toque.'
),

-- Electricidad (Electrical)
(
  'Miguel Rodríguez',
  'https://ui-avatars.com/api/?name=Miguel+Rodriguez&background=FFB800',
  4.8,
  167,
  'Costa del Este',
  ARRAY['electricidad'],
  40,
  400,
  '+507 6456-7890',
  '+507 456-7890',
  'Miguel es electricista certificado con todos los permisos al día. Ideal para trabajos que necesitan inspección oficial.',
  ARRAY['Instalación eléctrica', 'Reparación de tableros', 'Cableado', 'Instalación de lámparas'],
  'Lunes a Sábado, 7AM-7PM',
  15,
  ARRAY['https://picsum.photos/seed/miguel1/400/300', 'https://picsum.photos/seed/miguel2/400/300'],
  'Miguel es súper profesional. Siempre trae sus papeles en orden y te explica todo. No cobra de más y es rapidísimo.'
),
(
  'Ana Lucia Torres',
  'https://ui-avatars.com/api/?name=Ana+Torres&background=FF6B9D',
  4.9,
  134,
  'Bella Vista',
  ARRAY['electricidad'],
  45,
  350,
  '+507 6567-8901',
  '+507 567-8901',
  'Ana es de las pocas mujeres electricistas en Panamá y es EXCELENTE. Súper cuidadosa y detallista con su trabajo.',
  ARRAY['Reparaciones eléctricas', 'Instalación de ventiladores', 'Emergencias eléctricas', 'Iluminación'],
  'Lunes a Domingo, 24/7 para emergencias',
  10,
  ARRAY['https://picsum.photos/seed/ana1/400/300', 'https://picsum.photos/seed/ana2/400/300'],
  'Ana es una genia! Súper limpia en su trabajo y nada le queda grande. La llamo hasta para emergencias de noche.'
),

-- Pintura (Painting)
(
  'Julio Hernández',
  'https://ui-avatars.com/api/?name=Julio+Hernandez&background=00BCD4',
  4.6,
  89,
  'Obarrio',
  ARRAY['pintura'],
  150,
  400,
  '+507 6678-9012',
  '+507 678-9012',
  'Julio pinta paredes, techos, portones, lo que sea. Trabaja rápido y limpio, no te deja un reguero en la casa.',
  ARRAY['Pintura de interiores', 'Pintura de exteriores', 'Pintura de portones', 'Reparación de grietas'],
  'Lunes a Sábado, 8AM-6PM',
  14,
  ARRAY['https://picsum.photos/seed/julio1/400/300', 'https://picsum.photos/seed/julio2/400/300'],
  'Julio cobra justo y trabaja bien. Le pintó toda mi casa el año pasado y quedó linda. Eso sí, negociá el precio antes.'
),
(
  'Pedro Sánchez',
  'https://ui-avatars.com/api/?name=Pedro+Sanchez&background=9C27B0',
  4.8,
  112,
  'Paitilla',
  ARRAY['pintura'],
  180,
  450,
  '+507 6789-0123',
  '+507 789-0123',
  'Pedro se especializa en acabados finos y texturas decorativas. Si querés algo elegante, él es tu man.',
  ARRAY['Pintura decorativa', 'Texturas', 'Acabados especiales', 'Diseño de color'],
  'Martes a Sábado, 9AM-5PM',
  20,
  ARRAY['https://picsum.photos/seed/pedro1/400/300', 'https://picsum.photos/seed/pedro2/400/300'],
  'Pedro es artista más que pintor. Es un toque más caro pero si querés calidad premium, dale con él.'
),

-- Albañilería (Masonry)
(
  'José Luis Morales',
  'https://ui-avatars.com/api/?name=Jose+Morales&background=FF5722',
  4.7,
  156,
  'Calidonia',
  ARRAY['albañilería'],
  100,
  2000,
  '+507 6890-1234',
  '+507 890-1234',
  'José Luis hace de todo: pisos, paredes, ampliaciones, remodelaciones. Es el que tiene todo su equipo y herramientas.',
  ARRAY['Construcción', 'Remodelaciones', 'Instalación de pisos', 'Muros', 'Acabados'],
  'Lunes a Viernes, 7AM-5PM',
  22,
  ARRAY['https://picsum.photos/seed/jose1/400/300', 'https://picsum.photos/seed/jose2/400/300'],
  'José Luis es serio y cumplido. Si te dice que termina en 2 semanas, termina en 2 semanas. Eso es oro en este negocio.'
),

-- Limpieza (Cleaning)
(
  'María González',
  'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=4CAF50',
  4.9,
  203,
  'Marbella',
  ARRAY['limpieza'],
  50,
  150,
  '+507 6901-2345',
  '+507 901-2345',
  'María tiene empresa de limpieza con 5 personas. Hace limpiezas profundas, mudanzas, post-construcción, lo que necesites.',
  ARRAY['Limpieza profunda', 'Limpieza de mudanza', 'Limpieza post-construcción', 'Lavado de alfombras'],
  'Lunes a Sábado, 8AM-6PM',
  8,
  ARRAY['https://picsum.photos/seed/maria1/400/300', 'https://picsum.photos/seed/maria2/400/300'],
  'María es MUY buena. Le limpió mi casa después de la remodelación y quedó impecable. Super confiable.'
),

-- Jardinería (Gardening)
(
  'Fernando Castillo',
  'https://ui-avatars.com/api/?name=Fernando+Castillo&background=8BC34A',
  4.6,
  76,
  'Clayton',
  ARRAY['jardinería'],
  40,
  120,
  '+507 6012-3456',
  '+507 012-3456',
  'Fernando cuida jardines, corta grama, poda árboles. Viene cada semana o cuando lo necesités.',
  ARRAY['Mantenimiento de jardines', 'Poda de árboles', 'Corte de grama', 'Diseño de jardines'],
  'Lunes a Sábado, 7AM-4PM',
  11,
  ARRAY['https://picsum.photos/seed/fernando1/400/300', 'https://picsum.photos/seed/fernando2/400/300'],
  'Fernando es tranquilo y hace buen trabajo. No es el más barato pero llega siempre que dice y deja todo limpio.'
),

-- Cerrajería (Locksmith)
(
  'Daniel Ruiz',
  'https://ui-avatars.com/api/?name=Daniel+Ruiz&background=607D8B',
  4.8,
  91,
  'Casco Viejo',
  ARRAY['cerrajería'],
  25,
  80,
  '+507 6123-4567',
  '+507 123-4567',
  'Daniel es cerrajero 24/7. Te quedaste afuera de tu casa? Llama a Daniel. Llega en menos de 30 minutos.',
  ARRAY['Apertura de puertas', 'Cambio de cerraduras', 'Duplicado de llaves', 'Cerraduras de seguridad'],
  '24/7 - Servicio de emergencia',
  9,
  ARRAY['https://picsum.photos/seed/daniel1/400/300', 'https://picsum.photos/seed/daniel2/400/300'],
  'Daniel me ha sacado del apuro como 3 veces. Súper rápido y no te cobra un ojo de la cara por emergencias.'
),

-- Aire Acondicionado (Air Conditioning)
(
  'Ricardo Valdés',
  'https://ui-avatars.com/api/?name=Ricardo+Valdes&background=03A9F4',
  4.9,
  178,
  'San Francisco',
  ARRAY['aire acondicionado'],
  50,
  500,
  '+507 6234-5670',
  '+507 234-5670',
  'Ricardo es técnico certificado de todas las marcas. Instala, repara y da mantenimiento a A/C.',
  ARRAY['Instalación de A/C', 'Reparación', 'Mantenimiento', 'Recarga de gas', 'Limpieza de ductos'],
  'Lunes a Sábado, 8AM-6PM',
  16,
  ARRAY['https://picsum.photos/seed/ricardo1/400/300', 'https://picsum.photos/seed/ricardo2/400/300'],
  'Ricardo es el mejor en A/C. Sabe un montón y te explica todo. Precios justos y nunca te mete repuestos que no necesitás.'
),
(
  'Patricia Núñez',
  'https://ui-avatars.com/api/?name=Patricia+Nunez&background=E91E63',
  4.7,
  94,
  'Costa del Este',
  ARRAY['aire acondicionado'],
  60,
  450,
  '+507 6345-6780',
  '+507 345-6780',
  'Patricia se especializa en sistemas centrales y mantenimiento preventivo para casas grandes.',
  ARRAY['Sistemas centrales', 'Mantenimiento preventivo', 'Diagnóstico', 'Optimización de consumo'],
  'Lunes a Viernes, 9AM-5PM',
  13,
  ARRAY['https://picsum.photos/seed/patricia1/400/300', 'https://picsum.photos/seed/patricia2/400/300'],
  'Patricia es súper técnica y profesional. Si tenés un sistema grande, ella es la indicada. Sabe más que muchos hombres del ramo.'
),

-- Mudanzas (Moving)
(
  'Transportes Ramírez',
  'https://ui-avatars.com/api/?name=Ramirez+Trans&background=FF9800',
  4.6,
  124,
  'Bella Vista',
  ARRAY['mudanzas'],
  80,
  300,
  '+507 6456-7801',
  '+507 456-7801',
  'Empresa familiar de mudanzas. Tienen camión grande y empacan todo bien. Nunca me han roto nada.',
  ARRAY['Mudanzas locales', 'Empaque', 'Desmontaje de muebles', 'Transporte de electrodomésticos'],
  'Lunes a Domingo, 7AM-7PM',
  19,
  ARRAY['https://picsum.photos/seed/ramirez1/400/300', 'https://picsum.photos/seed/ramirez2/400/300'],
  'Los Ramírez son súper cuidadosos. Me mudé 2 veces con ellos y todo llegó perfecto. Precio razonable.'
),

-- Reparación de Electrodomésticos (Appliance Repair)
(
  'Técnicos Express - Luis Chen',
  'https://ui-avatars.com/api/?name=Luis+Chen&background=9E9E9E',
  4.8,
  145,
  'El Cangrejo',
  ARRAY['reparación de electrodomésticos'],
  40,
  150,
  '+507 6567-8902',
  '+507 567-8902',
  'Luis repara lavadoras, neveras, estufas, microondas, todo. Siempre trae repuestos en su camioneta.',
  ARRAY['Reparación de neveras', 'Lavadoras', 'Estufas', 'Microondas', 'Secadoras'],
  'Lunes a Sábado, 8AM-7PM',
  14,
  ARRAY['https://picsum.photos/seed/luis1/400/300', 'https://picsum.photos/seed/luis2/400/300'],
  'Luis es rapidísimo y sabe de todo. Me arregló la lavadora en una hora. Super recomendado.'
),

-- Multi-categoría
(
  'Jorge "El Todero" Vega',
  'https://ui-avatars.com/api/?name=Jorge+Vega&background=795548',
  4.7,
  187,
  'Obarrio',
  ARRAY['plomería', 'electricidad', 'pintura'],
  35,
  200,
  '+507 6678-9023',
  '+507 678-9023',
  'Jorge hace de todo un poco. Es el típico "todero" que te resuelve esas cositas del día a día sin complicaciones.',
  ARRAY['Reparaciones menores', 'Instalaciones básicas', 'Mantenimiento general', 'Trabajos varios'],
  'Lunes a Sábado, 8AM-6PM',
  17,
  ARRAY['https://picsum.photos/seed/jorge1/400/300', 'https://picsum.photos/seed/jorge2/400/300'],
  'Jorge es súper útil pa' esas reparaciones chiquitas que no ameritan llamar a un especialista. Cobra barato y es de confianza.'
);

-- Insert reviews for each provider
-- Roberto Méndez reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Roberto Méndez'), 'Carmen Díaz', 5.0, 'Excelente servicio! Reparó una fuga en mi baño super rápido y dejó todo limpio.', '2025-12-15'),
((SELECT id FROM providers WHERE name = 'Roberto Méndez'), 'Luis Mora', 4.8, 'Muy profesional y puntual. Llegó exactamente a la hora que dijo.', '2026-01-10'),
((SELECT id FROM providers WHERE name = 'Roberto Méndez'), 'Sandra López', 5.0, 'Roberto es honesto y no te cobra de más. Lo recomiendo 100%.', '2026-02-05');

-- Carlos Pinzón reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Carlos Pinzón'), 'Mario Gutiérrez', 4.7, 'Encontró una fuga que 3 plomeros antes no pudieron detectar. Vale la pena.', '2025-11-20'),
((SELECT id FROM providers WHERE name = 'Carlos Pinzón'), 'Verónica Castro', 4.6, 'Un poco caro pero muy bueno en lo que hace.', '2026-01-18'),
((SELECT id FROM providers WHERE name = 'Carlos Pinzón'), 'Pablo Ruiz', 4.8, 'Excelente diagnóstico y explicación detallada del problema.', '2026-02-12');

-- Miguel Rodríguez reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Miguel Rodríguez'), 'Ana Belén', 4.9, 'Miguel instaló toda la electricidad de mi apartamento. Impecable.', '2025-12-01'),
((SELECT id FROM providers WHERE name = 'Miguel Rodríguez'), 'Roberto Solis', 4.7, 'Muy profesional y con todos los papeles en regla.', '2026-01-25'),
((SELECT id FROM providers WHERE name = 'Miguel Rodríguez'), 'Carolina Pérez', 4.8, 'Rápido y eficiente. Me arregló un corto en menos de 2 horas.', '2026-02-14');

-- Ana Lucia Torres reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Ana Lucia Torres'), 'Martín Vega', 5.0, 'Ana es increíble! Super detallista y explica todo muy bien.', '2025-12-10'),
((SELECT id FROM providers WHERE name = 'Ana Lucia Torres'), 'Isabel Rojas', 4.9, 'Me salvó de una emergencia eléctrica un domingo en la noche. Gracias!', '2026-01-05'),
((SELECT id FROM providers WHERE name = 'Ana Lucia Torres'), 'Fernando Gil', 4.8, 'Excelente trabajo. Muy cuidadosa y limpia.', '2026-02-08');

-- Julio Hernández reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Julio Hernández'), 'Patricia Muñoz', 4.6, 'Buen trabajo de pintura. Terminó en el tiempo prometido.', '2025-11-15'),
((SELECT id FROM providers WHERE name = 'Julio Hernández'), 'Diego Ortiz', 4.5, 'Bien pero hay que negociar el precio antes de empezar.', '2026-01-20'),
((SELECT id FROM providers WHERE name = 'Julio Hernández'), 'Rosa Méndez', 4.7, 'Quedé contenta con el resultado. Trabajo limpio.', '2026-02-10');

-- Pedro Sánchez reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Pedro Sánchez'), 'Gabriela Torres', 4.9, 'Pedro es un artista! Las texturas que hizo en mi sala están hermosas.', '2025-12-05'),
((SELECT id FROM providers WHERE name = 'Pedro Sánchez'), 'Andrés Moreno', 4.8, 'Caro pero vale cada dólar. Calidad premium.', '2026-01-15'),
((SELECT id FROM providers WHERE name = 'Pedro Sánchez'), 'Lucía Ramírez', 4.7, 'Muy profesional y con ojo para el diseño.', '2026-02-02');

-- José Luis Morales reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'José Luis Morales'), 'Ricardo Núñez', 4.8, 'José Luis me amplió la cocina. Trabajo sólido y bien hecho.', '2025-11-25'),
((SELECT id FROM providers WHERE name = 'José Luis Morales'), 'Mónica Vargas', 4.6, 'Cumplido con los tiempos. Eso es lo que más valoro.', '2026-01-12'),
((SELECT id FROM providers WHERE name = 'José Luis Morales'), 'Enrique Soto', 4.7, 'Recomendado para remodelaciones. Serio y responsable.', '2026-02-16');

-- María González reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'María González'), 'Sofía Paredes', 5.0, 'María y su equipo son increíbles! Dejaron mi casa brillando.', '2025-12-20'),
((SELECT id FROM providers WHERE name = 'María González'), 'Julio Campos', 4.9, 'Súper confiables. Les puedo dejar las llaves de mi casa sin problema.', '2026-01-22'),
((SELECT id FROM providers WHERE name = 'María González'), 'Daniela Ruiz', 4.8, 'Excelente servicio de limpieza. Muy profesionales.', '2026-02-11');

-- Fernando Castillo reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Fernando Castillo'), 'Alberto Chen', 4.6, 'Buen trabajo con las plantas. Mi jardín se ve mejor que nunca.', '2025-11-30'),
((SELECT id FROM providers WHERE name = 'Fernando Castillo'), 'Carla Medina', 4.5, 'Cumplido y responsable. Llega cada semana sin falta.', '2026-01-28'),
((SELECT id FROM providers WHERE name = 'Fernando Castillo'), 'Miguel Sánchez', 4.7, 'Me diseñó un jardín hermoso. Recomendado.', '2026-02-07');

-- Daniel Ruiz reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Daniel Ruiz'), 'Laura Gómez', 4.9, 'Me salvó cuando me quedé encerrada. Llegó en 20 minutos!', '2025-12-12'),
((SELECT id FROM providers WHERE name = 'Daniel Ruiz'), 'Oscar Valdés', 4.8, 'Rápido y no cobra excesivo por emergencias.', '2026-01-16'),
((SELECT id FROM providers WHERE name = 'Daniel Ruiz'), 'Beatriz Castro', 4.7, 'Cambió todas las cerraduras de mi casa. Excelente servicio.', '2026-02-09');

-- Ricardo Valdés reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Ricardo Valdés'), 'Claudia Herrera', 5.0, 'Ricardo es el mejor técnico de A/C! Sabe muchísimo.', '2025-11-28'),
((SELECT id FROM providers WHERE name = 'Ricardo Valdés'), 'Javier Paz', 4.9, 'Instaló 3 aires en mi casa. Todo perfecto y funcionando excelente.', '2026-01-19'),
((SELECT id FROM providers WHERE name = 'Ricardo Valdés'), 'Natalia Jiménez', 4.8, 'Honesto y profesional. No te vende cosas que no necesitas.', '2026-02-13');

-- Patricia Núñez reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Patricia Núñez'), 'Tomás Elizondo', 4.7, 'Patricia optimizó mi sistema central. Ahora gasto menos luz!', '2025-12-08'),
((SELECT id FROM providers WHERE name = 'Patricia Núñez'), 'Silvia Cordero', 4.6, 'Muy técnica y profesional. Sabe lo que hace.', '2026-01-30'),
((SELECT id FROM providers WHERE name = 'Patricia Núñez'), 'Rodrigo Brenes', 4.8, 'Excelente para sistemas grandes y complejos.', '2026-02-15');

-- Transportes Ramírez reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Transportes Ramírez'), 'Fernanda Arias', 4.7, 'Cuidadosos y responsables. Recomendados para mudanzas.', '2025-11-22'),
((SELECT id FROM providers WHERE name = 'Transportes Ramírez'), 'Héctor Salas', 4.5, 'Buen precio y no me rompieron nada. Contentos.', '2026-01-26'),
((SELECT id FROM providers WHERE name = 'Transportes Ramírez'), 'Paola Montes', 4.6, 'Puntuales y eficientes. Me mudé en un día.', '2026-02-06');

-- Luis Chen reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Técnicos Express - Luis Chen'), 'Ramiro Duarte', 4.9, 'Luis arregló mi nevera en una hora. Súper rápido!', '2025-12-18'),
((SELECT id FROM providers WHERE name = 'Técnicos Express - Luis Chen'), 'Cristina Vega', 4.8, 'Siempre trae repuestos. No hay que esperar días.', '2026-01-23'),
((SELECT id FROM providers WHERE name = 'Técnicos Express - Luis Chen'), 'Antonio Flores', 4.7, 'Buen técnico. Sabe de muchas marcas.', '2026-02-17');

-- Jorge Vega reviews
INSERT INTO reviews (provider_id, author, rating, comment, date) VALUES
((SELECT id FROM providers WHERE name = 'Jorge "El Todero" Vega'), 'Valeria Campos', 4.7, 'Jorge es súper útil para arreglos del día a día.', '2025-11-26'),
((SELECT id FROM providers WHERE name = 'Jorge "El Todero" Vega'), 'Sebastián Rojas', 4.6, 'Bueno, bonito y barato. Resuelve rápido.', '2026-01-14'),
((SELECT id FROM providers WHERE name = 'Jorge "El Todero" Vega'), 'Elena Mora', 4.8, 'Muy versátil. Siempre me saca de apuros.', '2026-02-04');
