package com.jsg.ahispringboot.member.entity;

import com.jsg.ahispringboot.company.entity.Posting;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "company")
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CompanyEntity {

    @Id
    @Column(name = "company_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @Column(name = "company")
    private String company;

    @Column(name = "employees_number")
    private int employeesNumber;

    @Column(name = "company_type")
    private String companyType;

    @Column(name = "establishment_date")
    private Date establishmentDate;

    @Column(name = "company_homepage")
    private String companyHomepage;


    //    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "member_id")
//    private MemberEntity memberEntity;
    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "logo_id", referencedColumnName = "logo_id")
    private LogoEntity logoEntity;
}
