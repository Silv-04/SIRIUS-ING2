import pandas as pd
import logging
from sqlalchemy import create_engine

# 📌 1. Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("import_log.txt"),  # Sauvegarde les logs dans un fichier
        logging.StreamHandler()  # Affiche les logs dans la console
    ]
)

logging.info("Début du script d'importation")

# 📌 2. Définition des paramètres
file_path = r"C:\Users\Ismail Benaissa\Desktop\SIRUIS\MOCK\INSERTION DB\ingredientdata.xls"
sheet_name = "DATAProducts"

DB_NAME = "episaine"
DB_USER = "postgres"
DB_PASSWORD = "root"
DB_HOST = "localhost"
DB_PORT = "5432"

# 📌 3. Lecture du fichier Excel
try:
    logging.info(f"Chargement du fichier Excel: {file_path} (Feuille: {sheet_name})")
    df = pd.read_excel(file_path, sheet_name=sheet_name, engine="xlrd")
    logging.info(f"Fichier chargé avec succès, {df.shape[0]} lignes et {df.shape[1]} colonnes trouvées.")
except Exception as e:
    logging.error(f"Erreur lors de la lecture du fichier Excel : {e}")
    exit()

# 📌 4. Connexion à PostgreSQL
try:
    logging.info("Connexion à PostgreSQL...")
    engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    conn = engine.connect()
    logging.info("Connexion réussie à PostgreSQL.")
except Exception as e:
    logging.error(f"Erreur lors de la connexion à PostgreSQL : {e}")
    exit()

# 📌 5. Nettoyage des noms de colonnes
df.columns = df.columns.str.lower().str.replace(" ", "_").str.replace("'", "").str.replace(r'\W', '', regex=True)
logging.info(f"Colonnes nettoyées : {list(df.columns)}")

# 📌 6. Vérification des colonnes existantes dans PostgreSQL
try:
    with engine.connect() as conn:
        table_columns = pd.read_sql(
            "SELECT column_name FROM information_schema.columns WHERE table_name = 'products';", conn
        )["column_name"].tolist()

    # Supprimer les colonnes qui n'existent pas dans PostgreSQL
    df = df[[col for col in df.columns if col in table_columns]]
    logging.info(f"Colonnes finales insérées : {list(df.columns)}")
except Exception as e:
    logging.error(f"Erreur lors de la récupération des colonnes de PostgreSQL : {e}")
    exit()

# 📌 7. Insertion des données dans PostgreSQL
try:
    logging.info("Insertion des données dans la table 'products'...")
    df.to_sql("products", engine, if_exists="append", index=False)
    logging.info("Données insérées avec succès dans la table 'products'.")
except Exception as e:
    logging.error(f"Erreur lors de l'insertion des données : {e}")
    exit()

# 📌 8. Vérification des données insérées
try:
    logging.info("Vérification des 5 premières lignes insérées :")
    result = pd.read_sql("SELECT * FROM products LIMIT 5;", engine)
    logging.info(f"\n{result}")
except Exception as e:
    logging.error(f"Erreur lors de la vérification des données : {e}")

# 📌 9. Fermeture de la connexion
conn.close()
logging.info("Connexion à PostgreSQL fermée.")
logging.info("Script terminé avec succès.")
 ##################################################################
  ##################################################################
 ################################################################## ##################################################################
 ################################################################## ##################################################################
 ################################################################## ##################################################################
 ################################################################## ##################################################################
 ################################################################## ##################################################################
 ################################################################## ##################################################################
 ################################################################## ##################################################################
 ################################################################## ##################################################################
 ################################################################## ##################################################################
 ##################################################################
 ##################################################################



 import pandas as pd
import logging
import os
import unicodedata
from sqlalchemy import create_engine
from sqlalchemy.types import String, Float

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("import_log.txt"),  # Sauvegarde des logs dans un fichier
        logging.StreamHandler()  # Affiche les logs dans la console
    ]
)

logging.info("Début du script d'importation")

# Définition des paramètres
file_path = r"C:/Users/Ismail Benaissa/Desktop/SIRUIS/MOCK/INSERTION DB/ingredientdata.xlsx"
sheet_name = "DATAProducts"

DB_NAME = "episaine"
DB_USER = "postgres"
DB_PASSWORD = "root"
DB_HOST = "localhost"
DB_PORT = "5432"

# Vérification et Lecture du fichier Excel
if not os.path.exists(file_path):
    logging.error(f"Le fichier {file_path} est introuvable. Vérifiez le chemin.")
    exit()

try:
    logging.info(f"Chargement du fichier Excel: {file_path} (Feuille: {sheet_name})")
    df = pd.read_excel(file_path, sheet_name=sheet_name, engine="openpyxl")
    logging.info(f"Fichier chargé avec succès : {df.shape[0]} lignes et {df.shape[1]} colonnes trouvées.")
except Exception as e:
    logging.error(f"Erreur lors de la lecture du fichier Excel : {e}")
    exit()

# Nettoyage des données

# 1. Remplacer les valeurs NaN par une chaîne vide pour éviter les problèmes
df = df.fillna("")

# 2. Normalisation des noms de colonnes : minuscules, suppression des accents et caractères spéciaux
df.columns = (
    df.columns.str.lower()
    .str.replace(" ", "_")
    .str.replace("'", "")
    .str.replace(r'\W', '', regex=True)
)

logging.info(f"Colonnes après nettoyage : {list(df.columns)}")

# Séparation des colonnes textuelles et numériques
colonnes_textuelles = ["nom_groupe", "nom_sousgroupe", "nom_soussousgroupe", "nom_produit"]
colonnes_textuelles = [col for col in colonnes_textuelles if col in df.columns]

colonnes_numeriques = [col for col in df.columns if col not in colonnes_textuelles]

# 🔹 Nettoyage avancé des colonnes textuelles : suppression des accents et espaces inutiles
def nettoyer_texte(texte):
    if isinstance(texte, str):
        texte = texte.strip()  # Supprime les espaces au début et à la fin
        texte = unicodedata.normalize('NFKD', texte).encode('ascii', 'ignore').decode('utf-8')  # Supprime les accents
        return texte if texte else None  # Remplace les chaînes vides par None
    return None

for col in colonnes_textuelles:
    df[col] = df[col].apply(nettoyer_texte)

# 🔹 Conversion des colonnes numériques en float
for col in colonnes_numeriques:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# Vérification du contenu avant insertion
logging.info(f"Aperçu des 5 premières lignes après nettoyage :\n{df.head(10)}")

# Connexion à PostgreSQL
try:
    logging.info("Connexion à PostgreSQL...")
    engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    with engine.connect() as conn:
        logging.info("Connexion réussie à PostgreSQL.")

        # Vérification des colonnes existantes dans PostgreSQL
        table_columns_query = """
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'products';
        """
        table_columns = pd.read_sql(table_columns_query, conn)["column_name"].tolist()

        # Conserver uniquement les colonnes présentes dans la table
        df = df[[col for col in df.columns if col in table_columns]]
        logging.info(f"Colonnes finales insérées : {list(df.columns)}")

        # Définition des types pour PostgreSQL
        dtype_dict = {col: String for col in colonnes_textuelles}
        dtype_dict.update({col: Float for col in colonnes_numeriques})

        # Insertion des données dans PostgreSQL
        logging.info("Insertion des données dans la table 'products'...")
        df.to_sql("products", engine, if_exists="append", index=False, method="multi", chunksize=500, dtype=dtype_dict)
        logging.info(f"{df.shape[0]} lignes insérées avec succès.")

        # Vérification des 5 premières lignes insérées
        result = pd.read_sql("SELECT * FROM products LIMIT 5;", conn)
        logging.info(f"Aperçu des données insérées :\n{result}")

except Exception as e:
    logging.error(f"Erreur lors du traitement des données : {e}")
    exit()

logging.info("Script terminé avec succès.")
