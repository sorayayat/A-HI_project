package com.jsg.ahispringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class AhiSpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(AhiSpringbootApplication.class, args);
    }

}
