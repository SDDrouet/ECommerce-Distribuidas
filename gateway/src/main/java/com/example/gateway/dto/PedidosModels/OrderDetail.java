package com.example.gateway.dto.PedidosModels;

import com.example.gateway.dto.InventoryModels.Product;
import lombok.Data;

@Data
public class OrderDetail {
    private Product product;
    private int quantity;
    private double subtotal;
    private double tax;
    private double total;
}
