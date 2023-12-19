package com.jsg.ahispringboot.inspection.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@DynamicInsert
@Table(name = "user")
public class user {

    @Id
    @Column(name = "user_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCode;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "userPwd")
    private String userPwd;

    @Column(name = "userName")
    private String userName;

    @Column(name = "phon_number")
    private String phonNumber;

    @OneToMany
    private List<resume> resume = new ArrayList<>();
}
