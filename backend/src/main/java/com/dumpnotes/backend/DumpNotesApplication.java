package com.dumpnotes.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class DumpNotesApplication {

	public static void main(String[] args) {
		SpringApplication.run(DumpNotesApplication.class, args);
	}
}
