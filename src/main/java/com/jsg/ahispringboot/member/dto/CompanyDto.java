package com.jsg.ahispringboot.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class CompanyDto {
    private  String email;
    private String name;
    private String password;
    private Long phoneNumber;
    private String company;
    private String companyType;
    private int employeesNumber;
    private Date establishmentDate;
    private String companyHomepage;

}
