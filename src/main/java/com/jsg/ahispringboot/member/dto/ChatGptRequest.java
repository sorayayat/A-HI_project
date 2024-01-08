package com.jsg.ahispringboot.member.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class ChatGptRequest {

    private String model;
    private List<Message> messages;
    private Double temperature;
    private Integer max_tokens;
    private Map<String, String> response_format;
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
    public ChatGptRequest(String model, String prompt, Double temperature, Integer maxTokens, Map<String, String> responseFormat) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", prompt));
        this.temperature = temperature;
        this.max_tokens = maxTokens;
        this.response_format = responseFormat; // Set the response format
    }

    public void addSystemMessage(String content) {
        this.messages.add(new Message("system", content));
    }
}
