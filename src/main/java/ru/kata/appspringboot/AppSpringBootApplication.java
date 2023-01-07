package ru.kata.appspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import java.io.IOException;

@SpringBootApplication
public class AppSpringBootApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(AppSpringBootApplication.class, args);
		openHomePage();
	}

	private static void openHomePage() throws IOException {
		Runtime rt = Runtime.getRuntime();
		rt.exec("rundll32 url.dll,FileProtocolHandler " + "http://localhost:8088/login");
	}

}