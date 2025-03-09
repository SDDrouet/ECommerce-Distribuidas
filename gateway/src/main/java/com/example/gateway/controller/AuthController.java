package com.example.gateway.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
public class AuthController {
    @Value("${spring.security.oauth2.client.registration.client-app.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.client-app.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.client-app.redirect-uri}")
    private String redirectUri;

    @Value("${spring.security.oauth2.client.provider.spring.issuer-uri}")
    private String authServerUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/oauth/token")
    public ResponseEntity<Map<String, Object>> exchangeToken(@RequestParam String code) {
        String tokenUrl = authServerUrl + "/oauth2/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBasicAuth(clientId, clientSecret); // Autenticación básica con clientId y clientSecret

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("code", code);
        requestBody.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, requestEntity, Map.class);

        return ResponseEntity.ok(response.getBody());
    }

}
