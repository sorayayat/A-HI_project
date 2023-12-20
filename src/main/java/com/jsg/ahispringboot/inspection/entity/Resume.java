package com.jsg.ahispringboot.inspection.entity;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@DynamicInsert
@Table(name = "resume")
public class Resume {
    @Id
    @Column(name = "resume_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeCode;

    @Column(name = "enlistment_date")
    private String enlistmentDate;

    @Column(name = "discharge_date")
    private String dischargeDate;

    @Column(name = "military_service")
    private String militaryService;

    @Column(name = "path")
    private String path;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private User user;
}
