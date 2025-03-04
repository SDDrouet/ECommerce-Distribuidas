package com.example.micro_usuarios.service;

import com.example.micro_usuarios.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> getUserById(String id);
    List<User> getAllUsers();
    User updateUser(String id, User user);
    void deleteUser(String id);

    User registerUser(User user);
    User loginUser(String username, String password);
}

