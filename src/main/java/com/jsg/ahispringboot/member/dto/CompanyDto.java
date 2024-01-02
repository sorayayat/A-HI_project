package com.jsg.ahispringboot.member.dto;

import lombok.*;
import org.mapstruct.control.NoComplexMapping;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@Getter
@Setter
@Builder

public class CompanyDto {
    private Long memberId;
    private Long companyId;
    private  String email;
    private String name;
    private String password;
    private String phoneNumber;
    private String company;
    private String companyType;
    private int employeesNumber;
    private Date establishmentDate;
    private String companyHomepage;
    @Nullable
    private String logoServer;

}
