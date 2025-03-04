package com.example.gateway.dto.InventoryModels;

import lombok.Data;

@Data
public class Product {
    private String id;
    private String name;
    private String description;
    private int stock;
    private double price;
    private String imageBase64;
}

