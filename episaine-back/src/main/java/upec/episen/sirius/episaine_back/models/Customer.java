package upec.episen.sirius.episaine_back.models;

import java.sql.Date;
import java.util.List;
import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@Table(name="customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="customer_id") // Correspondance avec la base
    private Integer customerId;

    @Column(name="customer_lastname")
    private String customerLastname;

    @Column(name="customer_firstname")
    private String customerFirstname;

    @Column(name="customer_birthdate")
    private Date customerBirthdate;

    @Column(name="gender")
    private String gender;

    @Column(name="customer_phone_number")
    private String customerPhoneNumber;

    @Column(name="customer_mail")
    private String customerMail;

    @Column(name="city")
    private String city;

    @Column(name="address")
    private String address;

    @Column(name="postal_code")
    private String postalCode;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("customer") // Empêche les boucles infinies lors de la sérialisation
    private List<Information> informations;
}
