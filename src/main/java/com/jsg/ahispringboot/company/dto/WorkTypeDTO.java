package com.jsg.ahispringboot.company.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WorkTypeDTO {

    private Integer workCode;

    private String workConditions;

    private Integer postingCode;
}
