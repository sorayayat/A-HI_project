package com.jsg.ahispringboot.member.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "company")
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Long id;
    private String company;
    private String companyType;
    private int employeesNumber;
    private Date establishmentDate;
    private String companyHomepage;

  /*  @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;
*/
}
