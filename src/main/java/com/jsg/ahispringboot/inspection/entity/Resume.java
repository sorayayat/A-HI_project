package com.jsg.ahispringboot.inspection.entity;

import com.jsg.ahispringboot.member.entity.MemberEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "resume")
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    @Id
    @Column(name = "resume_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeCode;

    @Column(name = "resume_path")
    private String resumePath;

    @Column(name = "create_date")
    private String createDate;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_id")
    private MemberEntity member;
}
