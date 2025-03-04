package com.example.gateway.client;

import com.example.gateway.dto.PedidosModels.Order;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "micro-pedidos", url = "${ORDER_SERVICE_URL:http://localhost:8082}/orders")
public interface OrderClient {

    @GetMapping
    ResponseEntity<List<Order>> getAllOrders();

    @GetMapping("/{id}")
    ResponseEntity<?> getOrderById(@PathVariable String id);

    @PostMapping
    ResponseEntity<?> createOrder(@RequestBody Order order);

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteOrder(@PathVariable String id);
}
