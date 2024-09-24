
package com.dumpnotes.backend.controller;

import com.dumpnotes.backend.model.User;
import com.dumpnotes.backend.payload.LoginRequest;
import com.dumpnotes.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(authService.registerUser(user));
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        String result = authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (result.equals("User authenticated successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(401).body(result); // Return the appropriate failure message from the service
        }
    }
}
