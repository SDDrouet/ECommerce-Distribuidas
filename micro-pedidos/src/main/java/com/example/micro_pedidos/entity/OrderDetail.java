package com.example.micro_pedidos.entity;

import lombok.Data;

@Data
public class OrderDetail {
    private Product product;
    private int quantity;
    private double subtotal;
    private double tax; // IVA
    private double total;

    public static final double IVA_RATE = 0.15;

    public OrderDetail(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
        this.subtotal = product.getPrice() * quantity;
        this.tax = subtotal * IVA_RATE;
        this.total = subtotal + tax;
    }
}
