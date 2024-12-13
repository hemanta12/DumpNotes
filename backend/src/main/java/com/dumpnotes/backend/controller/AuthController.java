package com.dumpnotes.backend.controller;

import com.dumpnotes.backend.model.User;
import com.dumpnotes.backend.payload.LoginRequest;
import com.dumpnotes.backend.service.AuthService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

// import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, DumpNotes!";
    }

    @GetMapping("/error")
    public String handleError() {
        return "Custom Error: Something went wrong!";
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(authService.registerUser(user));
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String result = authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (result.equals("User authenticated successfully")) {
            session.setAttribute("username", loginRequest.getUsername());
            return ResponseEntity.ok(Map.of("username", loginRequest.getUsername(), "message", result));
        } else {
            return ResponseEntity.status(401).body(result);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate the session to log the user out
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // Clear any authentication cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setValue("");
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }

        return ResponseEntity.ok("User logged out successfully");
    }

    @GetMapping("/check-auth")
    public ResponseEntity<?> checkAuth(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username != null) {
            return ResponseEntity.ok(Map.of("authenticated", true, "username", username));
        }
        return ResponseEntity.ok(Map.of("authenticated", false));
    }
}