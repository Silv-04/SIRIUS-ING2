package upec.episen.sirius.episaine_back.models;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    /** Unique ID of the product */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Name of the main food group */
    private String nomGroupe;

    /** Name of the sub-food group */
    private String nomSousgroupe;

    /** Name of the sub-sub-food group */
    private String nomSoussousgroupe;

    /** The actual product name */
    private String nomProduit;

    /** Energy value in kilocalories */
    private Double energie_ue_kcal;

    /** Additional nutritional values */
    private Double glucides;
    private Double amidon;
    private Double lactose;

    /**
     * Default constructor.
     */
    public Product() {}

    /**
     * Constructor with parameters.
     *
     * @param nomGroupe The main food group name
     * @param nomSousgroupe The sub-group name
     * @param nomSoussousgroupe The sub-sub-group name
     * @param nomProduit The name of the product
     * @param energie_ue_kcal The energy in kcal
     * @param glucides the detail of the product
     * @param amidon the detail of the product
     * @param lactose the detail of the product
     */
    public Product(String nomGroupe, String nomSousgroupe, String nomSoussousgroupe, String nomProduit, Double energie_ue_kcal,Double glucides, Double amidon, Double lactose) {
        this.nomGroupe = nomGroupe;
        this.nomSousgroupe = nomSousgroupe;
        this.nomSoussousgroupe = nomSoussousgroupe;
        this.nomProduit = nomProduit;
        this.energie_ue_kcal  = energie_ue_kcal ;
        this.glucides = glucides;
        this.amidon = amidon;
        this.lactose = lactose;
    }

    /**
     * @return The unique ID of the product
     */
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomGroupe() { return nomGroupe; }
    public void setNomGroupe(String nomGroupe) { this.nomGroupe = nomGroupe; }

    public String getNomSousgroupe() { return nomSousgroupe; }
    public void setNomSousgroupe(String nomSousgroupe) { this.nomSousgroupe = nomSousgroupe; }

    public String getNomSoussousgroupe() { return nomSoussousgroupe; }
    public void setNomSoussousgroupe(String nomSoussousgroupe) { this.nomSoussousgroupe = nomSoussousgroupe; }

    public String getNomProduit() { return nomProduit; }
    public void setNomProduit(String nomProduit) { this.nomProduit = nomProduit; }

    public Double getenergie_ue_kcal () { return energie_ue_kcal ; }
    public void setenergie_ue_kcal (Double energie_ue_kcal ) { this.energie_ue_kcal  = this.energie_ue_kcal; }
    public Double getGlucides() { return glucides; }
    public void setGlucides(Double glucides) { this.glucides = glucides; }

    public Double getAmidon() { return amidon; }
    public void setAmidon(Double amidon) { this.amidon = amidon; }

    public Double getLactose() { return lactose; }
    public void setLactose(Double lactose) { this.lactose = lactose; }
}
