package com.jsg.ahispringboot.member.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig {

//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**") // 모든 경로에 대해
//                        .allowedOrigins("http://localhost:3000") // 허용할 오리진 설정
//                        .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메소드 설정
//                        .allowedHeaders("*") // 허용할 헤더 설정
//                        .allowCredentials(true) // 쿠키를 포함한 요청 허용
//                        .maxAge(3600); // pre-flight 요청의 캐시 시간(초 단위)
//            }
//        };
//    }



}
