package com.jsg.ahispringboot.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "logo_img")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogoEntity {
    @Id
    @Column(name = "logo_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logoId;
    private String originalName;
    private String serverName;
    @Column(name = "logo_path")
    private String path;

}
