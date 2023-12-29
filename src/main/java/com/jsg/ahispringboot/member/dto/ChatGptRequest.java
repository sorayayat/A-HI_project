package com.jsg.ahispringboot.member.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ChatGptRequest {

    private String model;
    private List<Message> messages;
    private Double temperature;
    private Integer max_tokens;

    public ChatGptRequest(String model, String prompt) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", prompt));
    }

    public ChatGptRequest(String model, String prompt, Double temperature, Integer maxTokens) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", prompt));
        this.temperature = temperature;
        this.max_tokens = maxTokens;
    }


    public void addSystemMessage(String content) {
        this.messages.add(new Message("system", content));
    }
}
