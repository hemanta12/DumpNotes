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

		System.out.println("SpringBoot Application Running");
	}
}
