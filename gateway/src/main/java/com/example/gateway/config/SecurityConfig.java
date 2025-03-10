package com.example.gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Value("${cors.allowed.origin}")
    private String frontEndUri;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        System.out.println("Origenes permitidos: " + frontEndUri);
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(frontEndUri)); // Cambia esto si necesitas otros orígenes
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests((authHttp) -> authHttp
                // Métodos publicos
                .requestMatchers("/oauth/token").permitAll()
                .requestMatchers(HttpMethod.GET,
                        "/products/**"
                ).permitAll()
                .requestMatchers(HttpMethod.POST,
                        "/products/**"
                ).permitAll()


                // Métodos para rol USER
                .requestMatchers(HttpMethod.GET,
                        "/users/**"
                ).hasAnyAuthority("SCOPE_USER", "SCOPE_ADMIN")
                .requestMatchers(HttpMethod.POST,
                        "/orders"
                ).hasAnyAuthority("SCOPE_USER", "SCOPE_ADMIN")
                .requestMatchers(HttpMethod.PUT,
                        "/users/**"
                ).hasAnyAuthority("SCOPE_USER", "SCOPE_ADMIN")

                // Métodos para rol ADMIN
                //.anyRequest().hasAuthority("SCOPE_ADMIN"))
                .anyRequest().authenticated())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2Login(login -> login.loginPage("/oauth2/authorization/client-app"))
                .oauth2ResourceServer(resourceServer -> resourceServer.jwt(withDefaults()));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
