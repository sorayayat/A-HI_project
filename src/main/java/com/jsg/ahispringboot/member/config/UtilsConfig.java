package com.jsg.ahispringboot.member.config;

import com.jsg.ahispringboot.member.utils.FileProcess;
import com.jsg.ahispringboot.member.utils.MailSend;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Configuration
@RequiredArgsConstructor
public class UtilsConfig {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;


    @Bean
    public MailSend mailSend() {
        return new MailSend(mailSender,templateEngine);
    }

    @Bean
    public FileProcess fileProcess(){
        return new FileProcess();
    }
}
