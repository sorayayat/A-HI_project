package com.jsg.ahispringboot.config;

import com.jsg.ahispringboot.member.login.CustomUserDetail;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;


@Configuration
@EnableWebSecurity
public class SecurityConfig  {




    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 경로에 대해
                        .allowedOrigins("http://localhost:3000") // 허용할 오리진 설정
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메소드 설정
                        .allowedHeaders("*") // 허용할 헤더 설정
                        .allowCredentials(true) // 쿠키를 포함한 요청 허용
                        .maxAge(3600); // pre-flight 요청의 캐시 시간(초 단위)
            }
        };
    }

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
                                        CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();
                                        String json = "{"
                                                + "\"message\": \"success\","
                                                + "\"email\": \"" + userDetails.getUsername() + "\","
                                                + "\"name\": \"" + userDetails.getRealName() + "\","
                                                + "\"phoneNumber\": " + userDetails.getPhoneNumber() + ","
                                                + "\"company\": \"" + userDetails.company() + "\","
                                                + "\"companyType\": \"" + userDetails.companyType() + "\","
                                                + "\"employeesNumber\": " + userDetails.employeesNumber() + ","
                                                + "\"establishmentDate\": \"" + userDetails.establishmentDate() + "\","
                                                + "\"companyHomepage\": \"" + userDetails.companyHomepage() + "\""
                                                + "\"companyId\": \"" + userDetails.companyPk() + "\","
                                                + "\"memberId\": \"" + userDetails.getPk() + "\","
                                                + "}";

                                        response.setStatus(HttpServletResponse.SC_OK);
                                        response.setCharacterEncoding("UTF-8");
                                        response.setContentType("application/json");
                                        response.getWriter().write(json);

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
