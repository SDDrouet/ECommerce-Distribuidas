package com.example.micro_pedidos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MicroPedidosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroPedidosApplication.class, args);
	}

}
