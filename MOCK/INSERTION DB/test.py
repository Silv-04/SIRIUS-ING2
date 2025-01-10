import psycopg2
import random
import faker
from datetime import datetime

# Initialisation du générateur de données fictives
fake = faker.Faker('fr_FR')

# Connexion à la base de données PostgreSQL
conn = psycopg2.connect(
    dbname="DB-TEST", 
    user="episaine", 
    password="episaine", 
    host="192.168.1.13", 
    port="5432"
)
cursor = conn.cursor()

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

    # Requête SQL d'insertion
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
        postal_code
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
    """

    # Exécution de la requête d'insertion
    cursor.execute(insert_query, (last_name, first_name, birthdate, gender, phone_number, email, city, address, postal_code))

# Insertion de 10 clients
def insert_multiple_customers(n=22):
    for _ in range(n):
        insert_customer()
    
    # Validation des modifications
    conn.commit()

# Exécution de l'insertion
if __name__ == "__main__":
    insert_multiple_customers()

    # Fermeture de la connexion
    cursor.close()
    conn.close()
