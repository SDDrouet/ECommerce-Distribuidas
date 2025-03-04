package com.example.micro_pedidos.service;

import com.example.micro_pedidos.entity.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<Order> getAllOrders();
    Optional<Order> getOrderById(String id);
    Order createOrder(Order order);
    void deleteOrder(String id);
}
