package com.example.micro_auth_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MicroAuthServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroAuthServerApplication.class, args);
	}

}
