package com.jsg.ahispringboot.inspection.entity;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DynamicInsert
@Table(name = "introduction")
public class Introduction {
    @Id
    @Column(name = "introduction_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long introductionCode;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @ManyToOne
    private Resume resume;

}
