package com.example.homevalue.controller;

import com.example.homevalue.dto.LoginRequest;
import com.example.homevalue.dto.RegisterRequest;
import com.example.homevalue.model.User;
import com.example.homevalue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody RegisterRequest request) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole() == null || request.getRole().isBlank() ? "USER" : request.getRole()
        );

        userRepository.save(user);

        response.put("success", true);
        response.put("message", "User registered successfully");
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(request.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid password");
            return response;
        }

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("user", user);
        response.put("token", "demo-token-" + user.getId());

        return response;
    }
}