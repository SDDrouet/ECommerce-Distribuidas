package com.example.micro_inventario.service.Impl;

import com.example.micro_inventario.entity.Product;
import com.example.micro_inventario.repository.ProductRepository;
import com.example.micro_inventario.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    @Override
    public Product updateProduct(String id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setStock(productDetails.getStock());
            product.setPrice(productDetails.getPrice());
            product.setImageBase64(productDetails.getImageBase64());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public boolean deleteProduct(String id) {
        Optional<Product> optionalProduct = getProductById(id);

        if(optionalProduct.isEmpty()) {
            return false;
        }

        productRepository.deleteById(id);

        return true;
    }

    @Override
    public Optional<Product> isThereStock(String id, int quantity) {
        Optional<Product> optionalProduct = getProductById(id);

        if (optionalProduct.isEmpty()) {
            return Optional.empty();
        }

        if (quantity > optionalProduct.get().getStock()) {
            return Optional.empty();
        }

        return optionalProduct;
    }
}
