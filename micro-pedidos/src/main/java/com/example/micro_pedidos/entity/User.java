package com.example.micro_pedidos.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class User {
    private String id;
    private String username;
}
