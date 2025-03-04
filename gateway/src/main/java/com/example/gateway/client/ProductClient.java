package com.example.gateway.client;

import com.example.gateway.dto.InventoryModels.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "micro-inventario", url = "${PRODUCT_SERVICE_URL:http://localhost:8081}/products")
public interface ProductClient {

    @GetMapping
    List<Product> getAllProducts();

    @GetMapping("/{id}")
    Optional<Product> getProductById(@PathVariable String id);

    @PostMapping
    Product createProduct(@RequestBody Product product);

    @PutMapping("/{id}")
    Product updateProduct(@PathVariable String id, @RequestBody Product productDetails);

    @DeleteMapping("/{id}")
    boolean deleteProduct(@PathVariable String id);

    @PutMapping("/{id}/stock")
    boolean updateStockProduct(@PathVariable String id, @RequestParam int quantity);

    @GetMapping("/{id}/stock/{quantity}")
    Optional<Product> checkStock(@PathVariable String id, @PathVariable int quantity);
}
