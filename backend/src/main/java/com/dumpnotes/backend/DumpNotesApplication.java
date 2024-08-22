//package main.java.com.dumpnotes.backend;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//@SpringBootApplication
//public class DumpNotesApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(DumpNotesApplication.class, args);
//	}
//}



package main.java.com.dumpnotes.backend;

import main.java.com.dumpnotes.backend.model.User;
import main.java.com.dumpnotes.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

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
		user1.setUsername("john");
		user1.setPassword("password123");  // Plain text password
		user1.setRoles("ROLE_USER");

		User user2 = new User();
		user2.setUsername("jane");
		user2.setPassword("password456");  // Plain text password
		user2.setRoles("ROLE_USER");

		User admin = new User();
		admin.setUsername("admin");
		admin.setPassword("adminpassword");  // Plain text password
		admin.setRoles("ROLE_ADMIN");

		// Save users to the database
		userRepository.save(user1);
		userRepository.save(user2);
		userRepository.save(admin);

		System.out.println("Users have been inserted into the database.");
	}
}
