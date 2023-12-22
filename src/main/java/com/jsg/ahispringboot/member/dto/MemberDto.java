package com.jsg.ahispringboot.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberDto {

    private Long id;
    private String email;
    private String name;
    private String password;
    private String phoneNumber;
    private String check;
}
