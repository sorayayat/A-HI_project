package com.jsg.ahispringboot.member.dto;

import lombok.*;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class ConfirmTokenDto {

    private Long id;
    private String token;
}
