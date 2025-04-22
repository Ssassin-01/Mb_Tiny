package com.meeti.mbTiny;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@EnableJpaAuditing
public class MbTinyApplication {

	public static void main(String[] args) {
		SpringApplication.run(MbTinyApplication.class, args);
	}

}
