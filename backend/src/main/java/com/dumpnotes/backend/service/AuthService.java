
package com.dumpnotes.backend.service;

import com.dumpnotes.backend.model.User;
import com.dumpnotes.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            user.setRoles("USER"); // Assign a default role if none provided
        }
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

                // Set user roles in the authentication
                User user = optionalUser.get();
                List<GrantedAuthority> authorities = Arrays.stream(user.getRoles().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                authentication = new UsernamePasswordAuthenticationToken(
                        username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Return a success message if authentication is successful
                // Return a success message if authentication is successful
                return "User authenticated successfully";
            } catch (Exception e) {
                return "Invalid credentials";
            }
        }
        return "User not found";
    }

}
