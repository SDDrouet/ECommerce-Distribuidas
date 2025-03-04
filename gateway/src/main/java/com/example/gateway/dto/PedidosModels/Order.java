package com.example.gateway.dto.PedidosModels;

import com.example.gateway.dto.UserModels.User;
import lombok.Data;

import java.util.List;

@Data
public class Order {
    private String id;
    private User user;
    private String address;
    private List<OrderDetail> orderDetails;
    private double subTotalCost;
    private double totalCost;
}

