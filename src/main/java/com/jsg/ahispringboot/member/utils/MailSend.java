package com.jsg.ahispringboot.member.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailParseException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@RequiredArgsConstructor
public class MailSend {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;


    public void sendNewPwd(String to, String subject, String text) {
        String mail = "변경된 비밀번호입니다." + text + "비밀번호를 변경해주세요.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public void sendEmail(String to, String subject, String code) {
        Context context = new Context();
        context.setVariable("code", code);

        String htmlContent = templateEngine.process("mail/mail", context);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true는 HTML 이메일임을 나타냅니다.
        } catch (MessagingException e) {
            throw new MailParseException(e);
        }
        mailSender.send(mimeMessage);
    }


    public String createCode() {
        int random = (int) (Math.random() * 1000000);
        String code = String.valueOf(random);
        return code;
    }
}
