package com.example.gateway.dto.UserModels;

import lombok.Data;

@Data
public class User {
    private String id;
    private String username;
    private String password;
    private String role;
}
