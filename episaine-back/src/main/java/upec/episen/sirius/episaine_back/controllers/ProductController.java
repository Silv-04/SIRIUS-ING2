package upec.episen.sirius.episaine_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import upec.episen.sirius.episaine_back.models.Product;
import upec.episen.sirius.episaine_back.services.ProductService;
import java.util.List;

/**
 * Controller class for managing product-related HTTP requests.
 * Handles API  for retrieving all products, filtering by category, and getting product by ID.
 */

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * Retrieves all products from the database.
     * @return A list of all available products.
     */
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    /**
     * Retrieves products by their category.
     * @param category The category to filter products by.
     * @return A list of products that belong to the specified category.
     */
    @GetMapping("/category")
    public List<Product> getProductsByCategory(@RequestParam String category) {
        return productService.getProductsByCategory(category);
    }

    /**
     * Retrieves a specific product by its ID.
     * @param id The ID of the product to retrieve.
     * @return The product with the specified ID or null if not found.
     */
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
}
