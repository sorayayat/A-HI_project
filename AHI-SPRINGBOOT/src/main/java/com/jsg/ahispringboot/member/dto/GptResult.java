package com.jsg.ahispringboot.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GptResult {


    private String result;
    private String question1;
    private String question2;
    private String question3;
    private String question4;
    private String question5;
    private String question6;


}
