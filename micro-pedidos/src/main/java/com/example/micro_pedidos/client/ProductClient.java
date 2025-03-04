package com.example.micro_pedidos.client;

import com.example.micro_pedidos.entity.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "product-service", url = "${feign.client.products.url}")
public interface ProductClient {

    @GetMapping("/products")
    List<Product> getAllProducts();

    @GetMapping("/products/{id}")
    Optional<Product> getProductById(@PathVariable String id);

    @GetMapping("/products/{id}/stock/{quantity}")
    Optional<Product> checkStock(@PathVariable String id, @PathVariable int quantity);
}
