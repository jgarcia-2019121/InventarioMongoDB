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

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(String id, Product product) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product prodToUpdate = existingProduct.get();
            prodToUpdate.setName(product.getName());
            prodToUpdate.setQuantity(product.getQuantity());
            prodToUpdate.setPrice(product.getPrice());
            return productRepository.save(prodToUpdate);
        } else {
            throw new RuntimeException("Producto no encontrado");
        }
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
