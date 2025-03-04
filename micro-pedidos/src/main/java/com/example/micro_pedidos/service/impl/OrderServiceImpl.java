package com.example.micro_pedidos.service.impl;

import com.example.micro_pedidos.client.ProductClient;
import com.example.micro_pedidos.client.UserClient;
import com.example.micro_pedidos.entity.Order;
import com.example.micro_pedidos.entity.OrderDetail;
import com.example.micro_pedidos.entity.Product;
import com.example.micro_pedidos.entity.User;
import com.example.micro_pedidos.repository.OrderRepository;
import com.example.micro_pedidos.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserClient userClient;

    @Autowired
    private ProductClient productClient;


    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    @Override
    @Transactional
    public Order createOrder(Order order) {
        // Verificar si el usuario existe
        ResponseEntity<User> userResponse = userClient.getUserById(order.getUser().getId());
        if (!userResponse.getStatusCode().is2xxSuccessful() || userResponse.getBody() == null) {
            throw new IllegalArgumentException("Usuario no encontrado");
        }
        order.setUser(userResponse.getBody());

        // Validar productos y stock
        double subTotalCost = 0;
        for (OrderDetail detail : order.getOrderDetails()) {
            Optional<Product> productResponse = productClient.getProductById(detail.getProduct().getId());

            if (productResponse.isEmpty()) {
                throw new IllegalArgumentException("Producto con ID " + detail.getProduct().getId() + " no encontrado");
            }

            Product product = productResponse.get();
            if (detail.getQuantity() <= 0) {
                throw new IllegalArgumentException("Cantidad inválida para el producto " + product.getName());
            }

            if (productClient.checkStock(detail.getProduct().getId(), detail.getQuantity()).isEmpty()) {
                throw new IllegalArgumentException("No hay stock para el producto " + product.getName());
            }

            detail.setProduct(product);
            detail.setSubtotal(product.getPrice() * detail.getQuantity());
            detail.setTax(detail.getSubtotal() * OrderDetail.IVA_RATE);
            detail.setTotal(detail.getSubtotal() + detail.getTax());

            subTotalCost += detail.getTotal();
        }

        order.setSubTotalCost(subTotalCost);
        order.setTotalCost(subTotalCost);

        for (OrderDetail detail : order.getOrderDetails()) {
            boolean isUpdated = productClient.updateStockProduct(detail.getProduct().getId(), detail.getQuantity());

            if (!isUpdated) {
                throw new IllegalArgumentException("Error actualizando el stock");
            }
        }

        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(String id) {
        Optional<Order> existingOrder = orderRepository.findById(id);
        if (existingOrder.isEmpty()) {
            throw new IllegalArgumentException("Pedido no encontrado");
        }
        orderRepository.deleteById(id);
    }
}
