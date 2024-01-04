package com.jsg.ahispringboot.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import com.jsg.ahispringboot.member.login.CustomUserDetail;
import com.jsg.ahispringboot.member.memberEnum.MemberRole;
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
import java.sql.Date;

import static io.micrometer.core.instrument.util.StringEscapeUtils.escapeJson;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")

                .allowedOrigins("http://localhost:3000", "http://localhost:8000")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Authorization", "Content-Type")
                .exposedHeaders("Custom-Header")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/in/member/**").authenticated()
                        .requestMatchers("/in/member/**").hasRole("MEMBER")
                        .requestMatchers("/in/company/**").hasRole("COMPANY")
                )
                .formLogin((form) -> form.loginPage("/api/loginForm")
                        .loginProcessingUrl("/login")
                        .successHandler(new AuthenticationSuccessHandler() {
                            @Override
                            public void onAuthenticationSuccess(HttpServletRequest request,
                                    HttpServletResponse response, Authentication authentication)
                                    throws IOException, ServletException {
                                CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();
                                if (userDetails.getMemberEntity().getRole() != MemberRole.ROLE_COMPANY) {
                                    CompanyEntity companyEntity = new CompanyEntity();
                                    companyEntity.setCompanyId(0L);
                                    companyEntity.setCompanyHomepage("no");
                                    java.util.Date utilDate = new java.util.Date();
                                    Date sqlDate = new Date(utilDate.getTime());
                                    companyEntity.setEstablishmentDate(sqlDate);
                                    companyEntity.setEmployeesNumber(0);
                                    companyEntity.setCompanyType("no");
                                    companyEntity.setCompany("no");
                                    // userDetails.getMemberEntity().setCompanyEntity(companyEntity);
                                }
                                userDetails.getMemberEntity().setPassword("N");
//
                                ObjectMapper mapper = new ObjectMapper();
                                String json = mapper.writeValueAsString(userDetails);
                                response.setStatus(HttpServletResponse.SC_OK);
                                response.setCharacterEncoding("UTF-8");
                                response.setContentType("application/json");
                                response.getWriter().write(json);
                            }
                        })
                        .failureHandler(new AuthenticationFailureHandler() {
                            @Override
                            public void onAuthenticationFailure(HttpServletRequest request,
                                    HttpServletResponse response, AuthenticationException exception)
                                    throws IOException, ServletException {
                                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                response.setCharacterEncoding("UTF-8");
                                response.setContentType("application/json");
                                response.getWriter().write("{\"message\": \"로그인 실패 이메일,비밀번호를 확인 해주세요.\"}");
                            }
                        }))
                .logout((out) -> out
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
