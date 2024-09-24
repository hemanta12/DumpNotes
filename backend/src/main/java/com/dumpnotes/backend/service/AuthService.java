
package com.dumpnotes.backend.service;

import com.dumpnotes.backend.model.User;
import com.dumpnotes.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Authenticate user by username and password
    public String authenticateUser(String username, String password) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            try {
                // Authenticate the user using AuthenticationManager
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(username, password));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Return a success message if authentication is successful
                return "User authenticated successfully";
            } catch (Exception e) {
                // Log the error and return failure message
                System.out.println("Authentication failed: " + e.getMessage());
                return "Invalid credentials";
            }
        } else {
            // Return a message if the user does not exist
            return "User not found";
        }
    }

}
