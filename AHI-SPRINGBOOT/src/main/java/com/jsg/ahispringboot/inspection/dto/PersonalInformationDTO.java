package com.jsg.ahispringboot.inspection.dto;

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
public class PersonalInformationDTO {

    private String name;
    private String position;
    private String email;
    private String github;
    private String phone;
    private String education;
}
