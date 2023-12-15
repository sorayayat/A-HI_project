package com.jsg.ahispringboot.member.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;


@Configuration
public class SecurityConfig {



    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/api/member/**").authenticated()

                )
                .formLogin((form) ->
                        form.loginPage("/api/loginForm")
                                .loginProcessingUrl("/login")
                                .successHandler(new AuthenticationSuccessHandler() {
                                    @Override
                                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                                        response.setStatus(HttpServletResponse.SC_OK);
                                        response.setCharacterEncoding("UTF-8");
                                        response.setContentType("application/json");
                                        response.getWriter().write("{\"message\": \"success\"}");
                                    }
                                })
                                .failureHandler(new AuthenticationFailureHandler() {
                                    @Override
                                    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                        response.setCharacterEncoding("UTF-8");
                                        response.setContentType("application/json");
                                        response.getWriter().write("{\"message\": \"로그인 실패 이메일,비밀번호를 확인 해주세요.\"}");
                                    }
                                }
                                )
                )
                .logout((out) ->out
                                .logoutUrl("/logout") // 로그아웃 처리 URL 설정
                                .logoutSuccessUrl("/") // 로그아웃 성공 후 리다이렉트할 URL
                                .invalidateHttpSession(true) // 세션 무효화
                                .deleteCookies("JSESSIONID")
                                .invalidateHttpSession(true))

                .build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
