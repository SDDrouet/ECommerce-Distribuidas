package com.example.micro_pedidos.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private User user;
    private String address;
    private List<OrderDetail> orderDetails;
    private double subTotalCost;
    private double totalCost;
}

