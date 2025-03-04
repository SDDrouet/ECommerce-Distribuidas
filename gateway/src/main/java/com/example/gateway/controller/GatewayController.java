package com.example.gateway.controller;

import com.example.gateway.client.OrderClient;
import com.example.gateway.client.ProductClient;
import com.example.gateway.client.UserClient;
import com.example.gateway.dto.InventoryModels.Product;
import com.example.gateway.dto.PedidosModels.Order;
import com.example.gateway.dto.UserModels.User;
import feign.FeignException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*") // Permitir todas las conexiones (temporalmente)
public class GatewayController {

    private final ProductClient productClient;
    private final UserClient userClient;
    private final OrderClient orderClient;

    public GatewayController(ProductClient productClient, UserClient userClient, OrderClient orderClient) {
        this.productClient = productClient;
        this.userClient = userClient;
        this.orderClient = orderClient;
    }

    // Productos
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productClient.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public Optional<Product> getProductById(@PathVariable String id) {
        return productClient.getProductById(id);
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productClient.createProduct(product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        return productClient.updateProduct(id, productDetails);
    }

    @DeleteMapping("/products/{id}")
    public boolean deleteProduct(@PathVariable String id) {
        return productClient.deleteProduct(id);
    }

    @PutMapping("/products/{id}/stock")
    public boolean updateStockProduct(@PathVariable String id, @RequestParam int quantity) {
        return productClient.updateStockProduct(id, quantity);
    }

    @GetMapping("/products/{id}/stock/{quantity}")
    public Optional<Product> checkStock(@PathVariable String id, @PathVariable int quantity) {
        return productClient.checkStock(id, quantity);
    }

    // Usuarios
    @PostMapping("/users/register")
    public User registerUser(@RequestBody User user) {
        return userClient.registerUser(user);
    }

    @PostMapping("/users/login")
    public User loginUser(@RequestParam String username, @RequestParam String password) {
        return userClient.loginUser(username, password);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userClient.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userClient.getUserById(id);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User user) {
        return userClient.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id) {
        userClient.deleteUser(id);
    }

    // Obtener todos los pedidos
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        try {
            return orderClient.getAllOrders();
        } catch (FeignException e) {
            return ResponseEntity.status(e.status()).body(e.contentUTF8());
        }
    }

    // Obtener pedido por ID
    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id) {
        try {
            return orderClient.getOrderById(id);
        } catch (FeignException e) {
            return ResponseEntity.status(e.status()).body(e.contentUTF8());
        }
    }

    // Crear un pedido
    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            return orderClient.createOrder(order);
        } catch (FeignException e) {
            return ResponseEntity.status(e.status()).body(e.contentUTF8());
        }
    }

    // Eliminar un pedido
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable String id) {
        try {
            return orderClient.deleteOrder(id);
        } catch (FeignException e) {
            return ResponseEntity.status(e.status()).body(e.contentUTF8());
        }
    }
}
