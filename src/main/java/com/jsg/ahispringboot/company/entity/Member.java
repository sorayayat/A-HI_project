package com.jsg.ahispringboot.company.entity;

import com.jsg.ahispringboot.member.entity.CompanyEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @Column(name = "member_id")
    private Integer memberId;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number")
    private String phone_number;

    @Column(name = "role")
    private String role;

    @Column(name = "company_id" , nullable = true)
    private CompanyEntity company;
}
