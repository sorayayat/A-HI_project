package com.jsg.ahispringboot.inspection.dto;

import org.springframework.web.bind.annotation.RequestBody;

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
public class SelectResumeDTO {
    private Long resumeCode;
    private MemberDto memberDto;
}
