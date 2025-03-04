package com.example.micro_inventario.service;

import com.example.micro_inventario.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAllProducts();
    Product createProduct(Product product);
    Optional<Product> getProductById(String id);
    Product updateProduct(String id, Product productDetails);
    boolean deleteProduct(String id);
    Optional<Product> isThereStock(String id, int quantity);
    boolean updateStockProduct(String id, int quantity);
}
