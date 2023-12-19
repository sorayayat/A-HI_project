package com.jsg.ahispringboot.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Authorization", "Content-Type")
                .exposedHeaders("Custom-Header")
                .allowCredentials(true)
                .maxAge(3600);
    }
    // @Bean
    // CorsConfigurationSource configurationSource() {
    // CorsConfiguration configuration = new CorsConfiguration();
    // // 로컬 React에서 오는 요청은 CORS 허용해준다.
    // configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    // configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST",
    // "DELETE"));
    // configuration.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Origin",
    // "Content-Type",
    // "Access-Control-Allow-Headers", "Authorization", "X-Requested-With"));
    // UrlBasedCorsConfigurationSource source = new
    // UrlBasedCorsConfigurationSource();
    // source.registerCorsConfiguration("/**", configuration);
    // return source;
    // }

}
