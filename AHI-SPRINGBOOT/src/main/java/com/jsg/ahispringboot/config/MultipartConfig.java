package com.jsg.ahispringboot.config;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

// spring boot 3 이상부터 multipart를 사용할때 이걸 만들어줘야 한다.

@Configuration
public class MultipartConfig {

    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {

        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setLocation("c:\\shop");
        factory.setMaxRequestSize(DataSize.ofMegabytes(500L));
        factory.setMaxFileSize(DataSize.ofMegabytes(500L));

        return factory.createMultipartConfig();
    }
}