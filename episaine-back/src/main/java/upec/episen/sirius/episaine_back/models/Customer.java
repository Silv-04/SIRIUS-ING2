package upec.episen.sirius.episaine_back.models;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
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

    // Getters and Setters
    public Integer getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Integer customer_id) {
        this.customer_id = customer_id;
    }

    public String getCustomer_lastname() {
        return customer_lastname;
    }

    public void setCustomer_lastname(String customer_lastname) {
        this.customer_lastname = customer_lastname;
    }

    public String getCustomer_firstname() {
        return customer_firstname;
    }

    public void setCustomer_firstname(String customer_firstname) {
        this.customer_firstname = customer_firstname;
    }

    public Date getCustomer_birthdate() {
        return customer_birthdate;
    }

    public void setCustomer_birthdate(Date customer_birthdate) {
        this.customer_birthdate = customer_birthdate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCustomer_phone_number() {
        return customer_phone_number;
    }

    public void setCustomer_phone_number(String customer_phone_number) {
        this.customer_phone_number = customer_phone_number;
    }

    public String getCustomer_mail() {
        return customer_mail;
    }

    public void setCustomer_mail(String customer_mail) {
        this.customer_mail = customer_mail;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }
}
