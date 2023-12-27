package com.jsg.ahispringboot.company.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skill")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "posting")
public class Skill {

    @Id
    @Column(name = "skill_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer skillCode;

    @Column(name = "skill_name")
    private String skillName;

    @ManyToOne
    @JoinColumn(name = "posting_code")
    @JsonIgnore
    private Posting posting;
}
