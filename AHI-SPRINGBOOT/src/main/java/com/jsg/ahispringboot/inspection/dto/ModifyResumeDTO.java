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
public class ModifyResumeDTO {
    @JsonProperty("direction")
    public String direction;
    @JsonProperty("eligibility")
    public EligibilityDTO eligibility;
    @JsonProperty("skill")
    public List<String> skill;
    @JsonProperty("selfIntroduction")
    public List<SelfIntroductionDTO> selfIntroduction;
}
