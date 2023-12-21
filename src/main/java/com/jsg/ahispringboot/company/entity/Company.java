package com.jsg.ahispringboot.company.entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "company")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Company {

    @Id
    @Column(name = "company_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer companyId;

    @Column(name = "company")
    private String company;

    @Column(name = "employees_number")
    private String employeesNumber;

    @Column(name = "company_type")
    private String companyType;

    @Column(name = "establishment_date")
    private String establishmentDate;

    @Column(name = "company_homepage")
    private String companyHomepage;


}
