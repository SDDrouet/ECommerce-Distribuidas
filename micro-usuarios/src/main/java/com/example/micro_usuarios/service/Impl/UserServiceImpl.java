package com.example.micro_usuarios.service.Impl;

import com.example.micro_usuarios.entity.User;
import com.example.micro_usuarios.repository.UserRepository;
import com.example.micro_usuarios.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(String id, User user) {
        if (userRepository.existsById(id)) {
            // Encriptar la contraseña si se ha proporcionado una nueva
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            user.setId(id);
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public User registerUser(User user) {
        // Verificar si el usuario ya existe
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("El usuario ya existe");
        }
        // Encriptar la contraseña antes de registrarlo
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User loginUser(String username, String password) {
        return userRepository.findByUsername(username);
    }
}
