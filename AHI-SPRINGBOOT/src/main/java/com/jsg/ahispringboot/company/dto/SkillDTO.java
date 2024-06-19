package com.jsg.ahispringboot.company.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SkillDTO {

    private Integer skillCode;

    private String skillName;

    private Integer postingCode;
}
