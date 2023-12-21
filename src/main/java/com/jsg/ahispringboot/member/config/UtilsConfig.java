package com.jsg.ahispringboot.member.config;

import com.jsg.ahispringboot.member.utils.MailSend;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;

@Configuration
public class UtilsConfig {

    private final JavaMailSender mailSender;

    public UtilsConfig(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Bean
    public MailSend mailSend() {
        return new MailSend(mailSender);
    }
}
