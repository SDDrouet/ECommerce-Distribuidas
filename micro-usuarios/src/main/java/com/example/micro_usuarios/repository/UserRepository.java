package com.example.micro_usuarios.repository;

import com.example.micro_usuarios.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Puedes agregar consultas personalizadas si lo necesitas
    User findByUsername(String username);
}

