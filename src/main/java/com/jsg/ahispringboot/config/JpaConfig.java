package com.jsg.ahispringboot.config;


import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


    @Configuration
    @EntityScan(basePackages = "com.jsg.ahispringboot") // 인지할 Entity범위
    @EnableJpaRepositories(basePackages = "com.jsg.ahispringboot") // 인지할 repository 범위
    public class JpaConfig {
    }

