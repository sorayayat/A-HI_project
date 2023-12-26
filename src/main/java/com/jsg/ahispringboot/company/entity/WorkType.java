package com.jsg.ahispringboot.company.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import javax.naming.Name;

@Entity
@Table(name = "work_type")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "posting")
public class WorkType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_code")
    private Integer workCode;

    @Column(name = "work_conditions")
    private String workConditions;

    @JoinColumn(name = "posting_code")
    @ManyToOne
    @JsonIgnore
    private Posting posting;
}
