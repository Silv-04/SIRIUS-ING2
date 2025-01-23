import psycopg2
import random
import faker
from datetime import datetime, timedelta
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

# Fonction pour générer une date aléatoire entre deux bornes
def random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return start_date + timedelta(days=random_days)

# Fonction pour générer et insérer un client
def insert_customer():
    last_name = fake.last_name()
    first_name = fake.first_name()
    birthdate = fake.date_of_birth(minimum_age=18, maximum_age=85)
    gender = random.choice(['Male', 'Female'])
    phone_number = fake.phone_number()
    email = fake.email()
    city = fake.city()
    address = fake.address().replace("\n", " ")
    postal_code = fake.zipcode()
    date_creation = random_date(datetime(2024, 10, 1), datetime.now())

    # Requête SQL
    insert_query = """
    INSERT INTO public.customer (
        customer_lastname,
        customer_firstname,
        customer_birthdate,
        gender,
        customer_phone_number,
        customer_mail,
        city,
        address,
        postal_code,
        date_creation
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    """

    try:

        cursor.execute(insert_query, (last_name, first_name, birthdate, gender, phone_number, email, city, address, postal_code, date_creation))
        logging.info(f"Client {first_name} {last_name} inséré avec succès.")
    except Exception as e:
        logging.error(f"Erreur lors de l'insertion du client {first_name} {last_name}: {e}")

# Insertion de nb clients
def insert_multiple_customers(n=10):
    for _ in range(n):
        insert_customer()
    conn.commit()
    logging.info(f"{n} clients ont été insérés avec succès.")

if __name__ == "__main__":
    try:
        insert_multiple_customers()
    except Exception as e:
        logging.error(f"Erreur lors de l'exécution de l'insertion: {e}")

    # Fermeture de la connexion
    cursor.close()
    conn.close()
    logging.info("Connexion à la base de données fermée.")
