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
    private Double lipides;
    private Double glucose;
    private Double maltose;
    private Double fibres;
    private Double cholesterol;
    private Double sel;
    private Double calcium;
    private Double cuivre;
    private Double fer;
    private Double proteines_625;

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
     * @param lipides the detail of the product
     * @param glucose the detail of the product
     * @param maltose the detail of the product
     * @param fibres the detail of the product
     * @param cholesterol the detail of the product
     * @param sel the detail of the product
     * @param calcium the detail of the product
     * @param  cuivre detail of the product
     * @param  fer detail of the product
     * @param  proteines_625 detail of the product
     */

    public Product(String nomGroupe, String nomSousgroupe, String nomSoussousgroupe, String nomProduit, Double energie_ue_kcal, Double glucides, Double amidon, Double lactose, Double lipides, Double glucose, Double maltose, Double fibres, Double cholesterol, Double sel, Double calcium, Double cuivre, Double fer, Double proteines_625) {
        this.nomGroupe = nomGroupe;
        this.nomSousgroupe = nomSousgroupe;
        this.nomSoussousgroupe = nomSoussousgroupe;
        this.nomProduit = nomProduit;
        this.energie_ue_kcal = energie_ue_kcal;
        this.glucides = glucides;
        this.amidon = amidon;
        this.lactose = lactose;
        this.lipides = lipides;
        this.glucose = glucose;
        this.maltose = maltose;
        this.fibres = fibres;
        this.cholesterol = cholesterol;
        this.sel = sel;
        this.calcium = calcium;
        this.cuivre = cuivre;
        this.fer = fer;
        this.proteines_625 = proteines_625;
    }

    /**@return The unique ID of the product*/

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    /** @return The main food group name */

    public String getNomGroupe() { return nomGroupe; }
    public void setNomGroupe(String nomGroupe) { this.nomGroupe = nomGroupe; }

    /** @return The sub-group name */

    public String getNomSousgroupe() { return nomSousgroupe; }
    public void setNomSousgroupe(String nomSousgroupe) { this.nomSousgroupe = nomSousgroupe; }

    /** @return The sub-sub-group name */

    public String getNomSoussousgroupe() { return nomSoussousgroupe; }
    public void setNomSoussousgroupe(String nomSoussousgroupe) { this.nomSoussousgroupe = nomSoussousgroupe; }

    /** @return The actual product name */

    public String getNomProduit() { return nomProduit; }
    public void setNomProduit(String nomProduit) { this.nomProduit = nomProduit; }

    /** @return The energy value in kilocalories */

    public Double getenergie_ue_kcal () { return energie_ue_kcal ; }
    public void setenergie_ue_kcal (Double energie_ue_kcal ) { this.energie_ue_kcal  = this.energie_ue_kcal; }

    /** @return The amount of carbohydrates in grams */

    public Double getGlucides() { return glucides; }
    public void setGlucides(Double glucides) { this.glucides = glucides; }

    /** @return The amount of starch in grams */

    public Double getAmidon() { return amidon; }
    public void setAmidon(Double amidon) { this.amidon = amidon; }

    /** @return The amount of lactose in grams */

    public Double getLactose() { return lactose; }
    public void setLactose(Double lactose) { this.lactose = lactose; }

    /** @return The amount of fats in grams */

    public Double getLipides() { return lipides; }
    public void setLipides(Double lipides) { this.lipides = lipides; }

    /** @return The amount of glucose in grams */

    public Double getGlucose() { return glucose; }
    public void setGlucose(Double glucose) { this.glucose = glucose; }

    /** @return The amount of maltose in grams */

    public Double getMaltose() { return maltose; }
    public void setMaltose(Double maltose) { this.maltose = maltose; }

    /** @return The amount of fibers in grams */

    public Double getFibres() { return fibres; }
    public void setFibres(Double fibres) { this.fibres = fibres; }

    /** @return The amount of cholesterol in grams */

    public Double getCholesterol() { return cholesterol; }
    public void setCholesterol(Double cholesterol) { this.cholesterol = cholesterol; }

    /** @return The amount of salt in grams */

    public Double getSel() { return sel; }
    public void setSel(Double sel) { this.sel = sel; }

    /** @return The amount of calcium in grams */

    public Double getCalcium() { return calcium; }
    public void setCalcium(Double calcium) { this.calcium = calcium; }

    /** @return The amount of copper in grams */

    public Double getCuivre() { return cuivre; }
    public void setCuivre(Double cuivre) { this.cuivre = cuivre; }

    /** @return The amount of iron in grams */

    public Double getFer() { return fer; }
    public void setFer(Double fer) { this.fer = fer; }

    /** @return The amount of proteins in grams */

    public Double getProteines625() { return proteines_625; }
    public void setProteines625(Double proteines_625) { this.proteines_625 = proteines_625; }

}