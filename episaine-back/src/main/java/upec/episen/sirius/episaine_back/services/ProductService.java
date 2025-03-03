package upec.episen.sirius.episaine_back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upec.episen.sirius.episaine_back.models.Product;
import upec.episen.sirius.episaine_back.repositories.ProductRepository;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    /**
     * Retrieves all products from the database.
     * @return A list of all products.
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Retrieves products by their category.
     * @param category The category of the products to retrieve.
     * @return A list of products in the specified category.
     */
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByNomGroupe(category);
    }

    /**
     * Retrieves a product by its unique ID.
     * @param id The ID of the product to retrieve.
     * @return The product if found, or null if not found.
     */
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}