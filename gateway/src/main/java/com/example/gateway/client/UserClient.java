package com.example.gateway.client;

import com.example.gateway.dto.UserModels.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "micro-usuarios", url = "${USER_SERVICE_URL:http://localhost:8083}/users")
public interface UserClient {

    @PostMapping("/register")
    User registerUser(@RequestBody User user);

    @PostMapping("/login")
    User loginUser(@RequestParam String username, @RequestParam String password);

    @GetMapping
    List<User> getAllUsers();

    @GetMapping("/{id}")
    Optional<User> getUserById(@PathVariable String id);

    @PutMapping("/{id}")
    User updateUser(@PathVariable String id, @RequestBody User user);

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable String id);
}
