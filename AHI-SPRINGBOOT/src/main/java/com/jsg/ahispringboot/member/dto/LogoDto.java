package com.jsg.ahispringboot.member.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LogoDto {
    private Long logoId;
    private String originalName;
    private String serverName;
    private String path;
}
