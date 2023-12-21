package com.jsg.ahispringboot.inspection.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResumeDTO {
    private Long resumeCode;
    private String resumePath;
    private String createDate;
    private String modifyDate;
    private Long memberId;
}
