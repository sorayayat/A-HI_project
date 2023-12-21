package com.jsg.ahispringboot.member.controller;

import com.jsg.ahispringboot.member.dto.ChatGptRequest;
import com.jsg.ahispringboot.member.dto.ChatGptResponse;
import com.jsg.ahispringboot.member.service.ChatGptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/interview")
@Slf4j
@RequiredArgsConstructor
public class InterviewController {



    private final ChatGptService gptService;


    @GetMapping("/gpt")
    public String chat(@RequestParam String prompt){
        String result = gptService.promptMake(prompt);
        return result;
    }
}
