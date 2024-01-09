package com.jsg.ahispringboot.inspection.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AnswerDTO {
    @JsonProperty("gptAnswer")
    private String answer;
    @JsonProperty("SelfIntroduction")
    public List<SelfIntroductionDTO> selfIntroduction;
}
