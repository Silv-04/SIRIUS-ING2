import psycopg2
import random
import faker
import logging

# Configuration du logging
logging.basicConfig(
    filename='/home/episaine/dataInput/insertest.log',
    level=logging.INFO,  # Niveau de log
    format='%(asctime)s - %(levelname)s - %(message)s'
)

logging.info("Le script a commencé à s'exécuter.")
fake = faker.Faker()

# Connexion à la base de données PostgreSQL
try:
    conn = psycopg2.connect(
        dbname="DB-TEST",
        user="episaine",
        password="episaine",
        host="192.168.1.13",
        port="5432"
    )
    logging.info("Connexion à la base de données réussie.")
except Exception as e:
    logging.error(f"Erreur de connexion à la base de données: {e}")
    raise

cursor = conn.cursor()

# Fonction pour générer et insérer des informations
def insert_information():
    temperature_options = ["froid", "chaud", "aucune préférence"]
    regime_options = [
        "végétarien", "végétalien", "végane", "pescetarien", "flexitarien", "omnivore",
        "crudivore", "cétogène", "paléo", "sans gluten", "sans lactose", "halal", "casher"
    ]
    intolerance_options = [
        "gluten", "lactose", "fructose", "histamine", "sorbitol", "salicylates", "caféine",
        "glutamate", "fodmaps", "phénylalanine"
    ]
    cuisine_types = [
        "italienne", "française", "chinoise", "japonaise", "indienne", "mexicaine", "thaïlandaise",
        "espagnole", "libanaise", "turque", "greque", "marocaine", "vietnamienne", "américaine",
        "allemande", "portugaise", "coréenne", "anglaise", "sushis", "éthiopienne", "argentine",
        "brésilienne", "méditerranéenne", "péruvienne", "russe", "bulgare", "suédoise", "polonaise",
        "indonésienne", "hawaïenne", "australienne", "cajun", "caribéenne", "pakistanaise", "bangladaise",
        "philippine", "égyptienne", "irlandaise", "chiliienne", "kényane", "sud-africaine", "cubaine",
        "malaise", "afghane", "afro-américaine", "tunisienne"
    ]

    activity_levels = ["faible", "modéré", "élevé"]
    cooking_levels = ["débutant", "intermédiaire", "avancé"]
    preparation_times = ["moins de 15 minutes", "15-30 minutes", "30-60 minutes", "plus de 60 minutes"]

    health_goals = ["perte de poids", "gain de poids", "maintien de poids"]

    health_goal = random.choice(health_goals)
    allergies = ", ".join(fake.words(nb=random.randint(0, 3), ext_word_list=intolerance_options))
    intolerances = ", ".join(fake.words(nb=random.randint(0, 3), ext_word_list=intolerance_options))
    dietary_regime = random.choice(regime_options)
    meals_per_day = random.randint(1, 6)
    weight = random.randint(50, 120)
    height = random.randint(150, 200)
    prohibited_food = ", ".join(fake.words(nb=random.randint(0, 3)))
    recipe_temperature = random.choice(temperature_options)
    cuisine_type = random.choice(cuisine_types)
    fk_customer_id = fake.random_int(min=1, max=500)
    activity_level = random.choice(activity_levels)
    cooking_level = random.choice(cooking_levels)
    preparation_time = random.choice(preparation_times)

    # Requête SQL
    insert_query = """
    INSERT INTO public.informations (
        health_goal,
        allergies,
        intolerances,
        dietary_regime,
        meals_per_day,
        weight,
        height,
        prohibited_food,
        recipe_temperature,
        cuisine_type,
        fk_customer_id,
        activity_level,
        cooking_level,
        preparation_time
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    """

    try:
        cursor.execute(insert_query, (
            health_goal, allergies, intolerances, dietary_regime, meals_per_day, weight, height,
            prohibited_food, recipe_temperature, cuisine_type, fk_customer_id, activity_level,
            cooking_level, preparation_time
        ))
        logging.info("Informations insérées avec succès.")
    except Exception as e:
        logging.error(f"Erreur lors de l'insertion des informations: {e}")

# Insertion de plusieurs entrées
def insert_multiple_informations(n=10):
    for _ in range(n):
        insert_information()
    conn.commit()
    logging.info(f"{n} entrées ont été insérées avec succès.")

if __name__ == "__main__":
    try:
        insert_multiple_informations()
    except Exception as e:
        logging.error(f"Erreur lors de l'exécution de l'insertion: {e}")

    # Fermeture de la connexion
    cursor.close()
    conn.close()
    logging.info("Connexion à la base de données fermée.")
