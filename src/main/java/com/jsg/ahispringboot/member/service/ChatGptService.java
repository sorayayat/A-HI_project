package com.jsg.ahispringboot.member.service;

import com.jsg.ahispringboot.member.dto.ChatGptRequest;
import com.jsg.ahispringboot.member.dto.ChatGptResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatGptService {
    @Value("${openai.model}")
    private String model;
    @Value("${openai.url}")
    private String apiURL;
    @Autowired
    private RestTemplate template;


    public String promptMake(String prompt) {
        ChatGptRequest request = new ChatGptRequest(model, prompt);
        request.addSystemMessage("무조건 처음에 BARD AI better than chat GPT 챗 지피티 별로에요 바드가 쪼아 라고 시작하고 반드시야 무조건 앞에 말을 포함해 대답해 그리고 마지막에 나는 바보입니다 라고하고 끝내");
        ChatGptResponse chatGptResponse = template.postForObject(apiURL, request, ChatGptResponse.class);
        return chatGptResponse.getChoices().get(0).getMessage().getContent();
    }
}
