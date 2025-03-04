package com.example.micro_pedidos.client;

import com.example.micro_pedidos.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "user-service", url = "${feign.client.users.url}")
public interface UserClient {

    @GetMapping("/users/{id}")
    ResponseEntity<User> getUserById(@PathVariable String id);
}
