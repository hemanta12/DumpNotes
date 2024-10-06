
package com.dumpnotes.backend.service;

import com.dumpnotes.backend.model.User;

import com.dumpnotes.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

        @Autowired
        private UserRepository userRepository;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                // Remove "ROLE_" prefix if present to avoid duplication
                String[] roles = (user.getRoles() != null && !user.getRoles().isEmpty())
                                ? user.getRoles().replace("ROLE_", "").split(",")
                                : new String[] { "USER" }; // Default role without prefix

                return org.springframework.security.core.userdetails.User.builder()
                                .username(user.getUsername())
                                .password(user.getPassword())
                                .roles(roles)
                                .build();
        }
}
