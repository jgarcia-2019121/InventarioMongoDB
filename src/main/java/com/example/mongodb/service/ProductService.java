package com.example.mongodb.service;

import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(String id, Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            existingProduct.setPrice(updatedProduct.getPrice());
            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found");
        }
    }
}
