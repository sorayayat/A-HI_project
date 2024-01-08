package com.jsg.ahispringboot.company.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import jakarta.persistence.*;
import lombok.*;

import javax.naming.Name;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posting")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Posting {

    @Id
    @Column(name = "posting_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postingCode;

    @Column(name = "posting_date")
    private LocalDateTime postingDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "view_count")
    private int viewCount;

    @Column(name = "location")
    private String location;

    @Column(name = "position")
    private String position;

    @Column(name = "closing_form")
    private String closingForm;

    @Column(name = "content")
    private String content;

    @Column(name = "posting_title")
    private String postingTitle;

    @Column(name = "education")
    private String education;


    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyEntity company;

    @OneToMany(mappedBy = "posting" ,  cascade = CascadeType.ALL, orphanRemoval = true)
    List<PostingExperience> postingExperienceList;

    @OneToMany(mappedBy = "posting" , cascade = CascadeType.ALL, orphanRemoval = true)
    List<WorkType> workTypeList;

    @OneToMany(mappedBy = "posting" , cascade = CascadeType.ALL, orphanRemoval = true)
    List<Skill> skillList;

    @OneToMany(mappedBy = "posting" , cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    List<PostingLike> postingLikeList;




    @PrePersist
    public void prePersist() {
        // 다른 설정이 있다면 제거하고 postingDate 설정만 남기세요.
        this.postingDate = LocalDateTime.now();
    }

}
