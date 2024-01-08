package com.jsg.ahispringboot;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.io.File;


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class AhiSpringbootApplication {

    @Value("${app.file-storage.directory}")
    private String fileStoragePath;

    public static void main(String[] args) {
        SpringApplication.run(AhiSpringbootApplication.class, args);
    }

    @Bean
    CommandLineRunner createDirectory() {
        return args -> {
            System.out.println("folderPath = " + fileStoragePath);
            File directory = new File(fileStoragePath);
            if (!directory.exists()) {
                boolean created = directory.mkdir();
                if (created) {
                    System.out.println("Folder created successfully: " + fileStoragePath);
                } else {
                    System.out.println("Failed to create folder: " + fileStoragePath);
                }
            } else {
                System.out.println("Folder already exists: " + fileStoragePath);
            }
        };
    }
}
