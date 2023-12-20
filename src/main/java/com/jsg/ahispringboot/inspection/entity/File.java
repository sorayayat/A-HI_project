package com.jsg.ahispringboot.inspection.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "file")
@NoArgsConstructor
@AllArgsConstructor
public class File {

    @Id
    @Column(name = "file_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileCode;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "posting_code")
    private Long postionCode;
}
