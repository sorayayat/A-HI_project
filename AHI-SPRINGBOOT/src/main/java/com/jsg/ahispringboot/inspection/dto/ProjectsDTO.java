package com.jsg.ahispringboot.inspection.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProjectsDTO {
    @JsonProperty("ProjectsTitle")
    private String ProjectsTitle;
    @JsonProperty("ProjectsContent")
    private String ProjectsContent;
}
