package com.dumpnotes.backend;

import com.dumpnotes.backend.model.User;
import com.dumpnotes.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DumpNotesApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(DumpNotesApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Create some users for practice (plain text passwords)
		User user1 = new User();
		user1.setUsername("Blake");
		user1.setPassword("Blake");  // Plain text password
		user1.setRoles("ROLE_USER");


		User admin = new User();
		admin.setUsername("newadmin");
		admin.setPassword("newadmin");  // Plain text password
		admin.setRoles("ROLE_ADMIN");

		// Save users to the database
		userRepository.save(user1);
		userRepository.save(admin);

		System.out.println("Users have been inserted into the database.");
	}
}
