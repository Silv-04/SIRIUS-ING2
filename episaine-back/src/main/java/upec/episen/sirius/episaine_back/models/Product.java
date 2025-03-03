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
    private Double energieKcal;

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
     * @param energieKcal The energy in kcal
     */
    public Product(String nomGroupe, String nomSousgroupe, String nomSoussousgroupe, String nomProduit, Double energieKcal) {
        this.nomGroupe = nomGroupe;
        this.nomSousgroupe = nomSousgroupe;
        this.nomSoussousgroupe = nomSoussousgroupe;
        this.nomProduit = nomProduit;
        this.energieKcal = energieKcal;
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

    public Double getEnergieKcal() { return energieKcal; }
    public void setEnergieKcal(Double energieKcal) { this.energieKcal = energieKcal; }
}
