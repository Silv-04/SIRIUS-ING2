package upec.episen.sirius.episaine_back.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="customer")
public class Customer {

    @Id
    @Column(name="customer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customer_id;
    
    @Column(name="customer_lastname")
    private String customer_lastname;

    @Column(name="customer_firstname")
    private String customer_firstname;
    
    @Column(name="customer_birthdate")
    private Date customer_birthdate;

    @Column(name="gender")
    private String gender;

    @Column(name="customer_phone_number")
    private String customer_phone_number;

    @Column(name="customer_mail")
    private String customer_mail;
    
    @Column(name="city")
    private String city;

    @Column(name="address")
    private String address;

    @Column(name="postal_code")
    private String postal_code;
}
