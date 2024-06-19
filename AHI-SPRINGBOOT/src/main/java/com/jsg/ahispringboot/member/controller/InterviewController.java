package com.jsg.ahispringboot.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jsg.ahispringboot.member.dto.ChatGptRequest;
import com.jsg.ahispringboot.member.dto.ChatGptResponse;
import com.jsg.ahispringboot.member.dto.GptResult;
import com.jsg.ahispringboot.member.service.ChatGptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/interview")
@Slf4j
@RequiredArgsConstructor
public class InterviewController {


    private final ChatGptService gptService;


    @GetMapping("/gpt")
    public String chat(@RequestParam String queryString) throws JsonProcessingException {
        String result = gptService.validateCheck(queryString);
        log.info("gpt={}", result);
        return result;
    }

    @PostMapping("/person/answer")
    public String personAnswer(@RequestBody GptResult gptResult) throws JsonProcessingException {
        log.info("qusetion={},result={},question2={}", gptResult.getQuestion1(), gptResult.getResult(),gptResult.getQuestion2());
        String result = gptService.personAnswer(gptResult);
        log.info("gpt={}", result);
        return result;
    }
}
