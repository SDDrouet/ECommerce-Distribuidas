package com.example.micro_auth_server.client;

import com.example.micro_auth_server.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "micro-usuarios", url = "${services.micro.user-service-url}/users")
public interface UserClient {
    @PostMapping("/login")
    User loginUser(@RequestParam String username, @RequestParam String password);
}
