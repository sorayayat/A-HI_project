package com.jsg.ahispringboot.company.dto;

import com.jsg.ahispringboot.member.dto.LogoDto;
import lombok.*;

import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CompanyDTO {

    private Long companyId;
    private String email;
    private String name;
    private String password;
    private Long phoneNumber;
    private String company;
    private String companyType;
    private int employeesNumber;
    private Date establishmentDate;
    private String companyHomepage;
    private LogoDto logoEntity;


}
