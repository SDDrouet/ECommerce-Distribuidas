package com.example.micro_auth_server.config;

import com.example.micro_auth_server.client.UserClient;
import com.example.micro_auth_server.model.User;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {

    private final UserClient userClient; // Feign Client para conectar con tu microservicio de usuarios
    private final PasswordEncoder passwordEncoder; // Para comparar las contraseñas

    public UserAuthenticationProvider(UserClient userClient, PasswordEncoder passwordEncoder) {
        this.userClient = userClient;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        // Llamada al microservicio de usuarios para obtener el usuario
        User user = userClient.loginUser(username, password);

        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password");
        }

        // Aquí puedes comparar la contraseña en texto plano con la que tienes en tu base de datos (con PasswordEncoder)
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UsernameNotFoundException("Invalid username or password");
        }

        // Si la autenticación es exitosa, puedes devolver el objeto Authentication
        return new UsernamePasswordAuthenticationToken(user, password, AuthorityUtils.createAuthorityList(user.getRole()));
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

