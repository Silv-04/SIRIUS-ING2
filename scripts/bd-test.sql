CREATE TABLE clients (
    customer_id SERIAL PRIMARY KEY,
    customer_lastname VARCHAR(255),
    customer_firstname VARCHAR(255),
    customer_birthdate DATE,
    gender VARCHAR(50),
    customer_phone_number VARCHAR(15),
    customer_mail VARCHAR(255),
    city VARCHAR(100),
    address TEXT,
    postal_code VARCHAR(10)
);


 CREATE TABLE information (
    information_id SERIAL PRIMARY KEY,
    health_goal VARCHAR(255),
    allergies TEXT[],
    intolerances TEXT[],
    dietary_regime VARCHAR(255),
    meals_per_day INTEGER,
    weight INTEGER,
    height INTEGER,
    activity_level VARCHAR(255),
    prohibited_food TEXT[],
    recipe_temperature VARCHAR(50),
    cuisine_type VARCHAR(255),
    preparation_time VARCHAR(50),
    cooking_level VARCHAR(255),
    fk_customer_id INTEGER REFERENCES clients(customer_id)
);

CREATE TABLE allergies (
    id_allergie SERIAL PRIMARY KEY,
    type_allergie VARCHAR(255) NOT NULL,
    description TEXT
);

-- Insertion des données dans la table allergies
INSERT INTO allergies (type_allergie, description) VALUES
('Allergie aux arachides', 'Réaction immunitaire aux arachides, peut provoquer un choc anaphylactique.'),
('Allergie aux fruits de mer', 'Réaction grave aux crustacés ou mollusques.'),
('Allergie aux œufs', 'Courante chez les enfants, peut provoquer des symptômes respiratoires.'),
('Allergie au lait', 'Réaction aux protéines du lait (différente de l’intolérance au lactose).'),
('Allergie au blé', 'Réaction immunitaire au blé (différente de la maladie cœliaque).'),
('Allergie au soja', 'Courante chez les enfants, symptômes digestifs et respiratoires.'),
('Allergie aux fruits à coque', 'Inclut les noix, amandes, noisettes, etc.'),
('Allergie au sésame', 'Réaction courante et de plus en plus fréquente.'),
('Allergie au poisson', 'Réaction grave aux poissons comme le saumon ou le thon.'),
('Allergie aux légumineuses', 'Par exemple, pois chiches ou lentilles.');

CREATE TABLE intolerances (
    id_intolerance SERIAL PRIMARY KEY,
    type_intolerance VARCHAR(255) NOT NULL,
    description TEXT
);

-- Insertion des données dans la table intolerances
INSERT INTO intolerances (type_intolerance, description) VALUES
('Intolérance au lactose', 'Déficit en lactase, enzyme nécessaire pour digérer le lactose (sucre du lait).'),
('Intolérance au gluten', 'Sensibilité au gluten (différente de la maladie cœliaque).'),
('Intolérance aux sulfites', 'Réaction aux conservateurs présents dans certains vins ou fruits secs.'),
('Intolérance au fructose', 'Difficulté à absorber le fructose, sucre présent dans les fruits et légumes.'),
('Intolérance à l’histamine', 'Réaction à l’histamine dans certains aliments comme le fromage ou le vin.'),
('Intolérance au glutamate', 'Sensibilité au glutamate monosodique (MSG), souvent utilisé comme additif.'),
('Intolérance aux salicylates', 'Réaction à certains composés naturels dans les fruits, légumes et épices.'),
('Intolérance au sorbitol', 'Difficulté à digérer ce substitut de sucre présent dans les produits "light".');


CREATE TABLE nutritionists (
    nutritionist_id SERIAL PRIMARY KEY,
    nutritionist_lastname VARCHAR(255),
    nutritionist_firstname VARCHAR(255),
    nutritionist_phone_number VARCHAR(15),
    nutritionist_mail VARCHAR(255)
);

CREATE TABLE exploits (
    fk_information_id INTEGER REFERENCES informations(information_id),
    fk_nutritionist_id INTEGER REFERENCES nutritionists(nutritionist_id),
    PRIMARY KEY (fk_information_id, fk_nutritionist_id)
);

CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(255),
    calorie_count INTEGER,
    ingredients TEXT[],
    instructions TEXT,
    dietary_regime VARCHAR(255),
    fk_nutritionist_id INTEGER REFERENCES nutritionists(nutritionist_id)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    category VARCHAR(255),
    calories INTEGER
);
 CREATE TABLE composition (
    fk_recipe_id INTEGER REFERENCES recipes(recipe_id),
    fk_product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER,
    PRIMARY KEY (fk_recipe_id, fk_product_id)
);

