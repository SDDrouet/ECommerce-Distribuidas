package com.example.micro_auth_server.client;

import com.example.micro_auth_server.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "micro-usuarios", url = "${USER_SERVICE_URL:http://localhost:8083}/users")
public interface UserClient {
    @PostMapping("/login")
    User loginUser(@RequestParam String username, @RequestParam String password);
}
