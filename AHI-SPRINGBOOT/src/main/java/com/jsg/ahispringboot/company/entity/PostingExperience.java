package com.jsg.ahispringboot.company.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "posting_experience")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "posting")
public class PostingExperience {

    @Id
    @Column(name = "experience_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer experienceCode;

    @Column(name = "experience_level")
    private String experienceLevel;

    @ManyToOne
    @JoinColumn(name = "posting_code")
    @JsonIgnore
    private Posting posting;
}
