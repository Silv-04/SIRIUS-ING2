import pandas as pd
import logging
import os
import unicodedata
import re
from sqlalchemy import create_engine
from sqlalchemy.types import String, Float

#   Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
    #   Save logs & display on console
        logging.FileHandler("import_log.txt"),  
        logging.StreamHandler()
            ]
)
logging.info("Début du script d'importation")


#   Data Source ( Site de  l'état pour trouver les jeux de données)

##############################################################################################################
# https://www.data.gouv.fr/fr/datasets/open-food-facts-produits-alimentaires-ingredients-nutrition-labels/   #
##############################################################################################################


#   Setting parameters
file_path = r"C:/Users/Ismail Benaissa/Desktop/SIRUIS/MOCK/INSERTION DB/ingredientdata.xlsx"
sheet_name = "DATAProducts"

DB_NAME = "episaine"
DB_USER = "postgres"
DB_PASSWORD = "root"
DB_HOST = "localhost"
DB_PORT = "5432"



#   Checking and Reading the Excel File
if not os.path.exists(file_path):
    logging.error(f"Le fichier {file_path} est introuvable. Vérifiez le chemin.")
    exit()

try:
    logging.info(f"Uplode Excel file: {file_path} (Sheet: {sheet_name})")
    df = pd.read_excel(file_path, sheet_name=sheet_name, engine="openpyxl")
    logging.info(f"File uploaded successfully : {df.shape[0]} lines and {df.shape[1]} columns found.")
except Exception as e:
    logging.error(f"Error reading Excel file: {e}")
    exit()

#   Clean up column names
def nettoyer_colonne(nom):
    """ Cleans column names: remove accents, spaces and special characters """
    #   Remove accents
    nom = unicodedata.normalize("NFKD", nom).encode("ascii", "ignore").decode("utf-8")
    #   # Lowercase
    nom = nom.lower().strip()
    #   Removes special characters
    nom = re.sub(r"[^\w\s]", "", nom)  
    #   Replace spaces with "_"
    nom = nom.replace(" ", "_")  
    return nom
df.columns = [nettoyer_colonne(col) for col in df.columns]
logging.info(f"Columns after normalization : {df.columns.tolist()}")


#   Replacing NaN values
df = df.fillna("")


#   Definition of text and numeric columns
colonnes_textuelles = ["nom_groupe", "nom_sousgroupe", "nom_soussousgroupe", "nom_produit"]
colonnes_textuelles = [col for col in colonnes_textuelles if col in df.columns]
colonnes_numeriques = [col for col in df.columns if col not in colonnes_textuelles]

#   Cleaning text columns (REMOVING UNDERSCORES "_")
def nettoyer_texte(texte):
    """ Cleans text values: remove accents, spaces and replace special characters """
    if isinstance(texte, str):
        #   Remove spaces
        texte = texte.strip()
        #   Replace underscores with spaces
        texte = texte.replace("_", " ")
        #   Remove accents
        texte = unicodedata.normalize('NFKD', texte).encode('ascii', 'ignore').decode('utf-8')
          # Replaces empty strings with None
        return texte if texte else None
    return None

for col in colonnes_textuelles:
    df[col] = df[col].astype(str).apply(nettoyer_texte)

#   Converting numeric columns to float
for col in colonnes_numeriques:
    df[col] = pd.to_numeric(df[col], errors="coerce")

#   Verifying data before insertion
logging.info(f"Overview of the first 5 lines after cleaning :\n{df.head(10)}")



# Test for logging (not mondatory)
#   Connexion on PostgreSQL
try:
    logging.info("Connexion  PostgreSQL...")
    engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    with engine.connect() as conn:
        logging.info("Connexion réussie à PostgreSQL.")

        #   Verification of data prior to insertion
        table_exists_query = """
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = 'products'
        );
        """
        table_exists = pd.read_sql(table_exists_query, conn).iloc[0, 0]

        #   Checking existing columns
        table_columns_query = """
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'products';
        """
        table_columns = pd.read_sql(table_columns_query, conn)["column_name"].tolist()

        #   Keep only the columns present in the table
        df = df[[col for col in df.columns if col in table_columns]]
        logging.info(f"Colonnes finales insérées : {list(df.columns)}")

        #   Defining Types for PostgreSQL
        dtype_dict = {col: String for col in colonnes_textuelles}
        dtype_dict.update({col: Float for col in colonnes_numeriques})

        #   Inserting data into PostgreSQL
        logging.info("Insertion data on table 'products'...")
        df.to_sql("products", engine, if_exists="append", index=False, method="multi", chunksize=500, dtype=dtype_dict)
        logging.info(f"{df.shape[0]} lines inserted successfully.")

        #   Checking the first 5 inserted lines
        result = pd.read_sql("SELECT * FROM products LIMIT 5;", conn)
        logging.info(f"Overview of inserted data: :\n{result}")

except Exception as e:
    logging.error(f"Erreur lors du traitement des données : {e}")
    exit()
logging.info("Script completed successfully.")
