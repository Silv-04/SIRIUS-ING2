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

# Fonction  générer et insérer des recettes
def insert_recipe(dietary_regime, cuisine_types):
    recipe_name = fake.sentence(nb_words=3)[:255]  # Tronque à 255 caractères
    calorie_count = random.randint(200, 1000)
    ingredients = ", ".join(fake.words(nb=random.randint(5, 10)))[:255]  # Tronque à 255 caractères
    instructions = fake.paragraph(nb_sentences=3)[:255]  # Tronque à 255 caractères
    fk_nutritionist_id = 1  # Toujours le même ID nutritionniste
    category = random.choice(cuisine_types)


    insert_query = """
    INSERT INTO public.recipes (
        recipe_name,
        calorie_count,
        ingredients,
        instructions,
        dietary_regime,
        fk_nutritionist_id,
        category
    ) VALUES (%s, %s, %s, %s, %s, %s, %s);
    """

    try:
        logging.info(f"Données générées : {recipe_name}, {calorie_count}, {ingredients}, {instructions}, {dietary_regime}, {fk_nutritionist_id}, {category}")
        cursor.execute(insert_query, (
            recipe_name, calorie_count, ingredients, instructions, dietary_regime, fk_nutritionist_id, category
        ))
        logging.info(f"Recette '{recipe_name}' insérée avec succès pour le régime {dietary_regime}.")
    except Exception as e:
        logging.error(f"Erreur lors de l'insertion de la recette '{recipe_name}': {e}")

# Insertion de plusieurs recettes par régime
def insert_recipes_for_all_regimes(min_recipes_per_regime=20):
    regime_options = [
        "végétarien", "végétalien", "végane", "pescetarien", "flexitarien", "omnivore",
        "crudivore", "cétogène", "paléo", "sans gluten", "sans lactose", "halal", "casher"
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

    for regime in regime_options:
        for _ in range(min_recipes_per_regime):
            insert_recipe(regime, cuisine_types)

    conn.commit()
    logging.info(f"{min_recipes_per_regime * len(regime_options)} recettes ont été insérées avec succès.")

if __name__ == "__main__":
    try:
        insert_recipes_for_all_regimes()
    except Exception as e:
        logging.error(f"Erreur lors de l'exécution de l'insertion des recettes: {e}")
    finally:
        # Fermeture de la connexion
        cursor.close()
        conn.close()
        logging.info("Connexion à la base de données fermée.")
