package com.jsg.ahispringboot.inspection.dto;

import com.jsg.ahispringboot.member.dto.MemberDto;

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
public class ResumeDTO {
    private Long resumeCode;
    private String resumePath;
    private String createDate;
    private MemberDto member;
}
