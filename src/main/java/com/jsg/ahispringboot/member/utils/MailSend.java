package com.jsg.ahispringboot.member.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
@RequiredArgsConstructor
public class MailSend {

    private final JavaMailSender mailSender;


    public void sendEmail(String to, String subject, String text) {
        String mail = "변경된 비밀번호입니다."+text+"비밀번호를 변경해주세요.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public String createCode() {
        int random = (int) (Math.random() * 1000000);
        String code = String.valueOf(random);
        return code;
    }
}
