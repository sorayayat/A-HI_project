package com.jsg.ahispringboot.inspection.dto;

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
public class SelfIntroductionDTO {
    @JsonProperty("title")
    private String title;
    @JsonProperty("content")
    private String content;
}
