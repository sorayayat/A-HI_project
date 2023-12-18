package com.jsg.ahispringboot.company.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    @Column(name = "end-date")
    private String endDate;

    @Column(name = "view_count")
    private int viewCount;

    @Column(name = "location")
    private String location;

    @Column(name = "position")
    private String position;

    @Column(name = "closing _form")
    private String closingForm;

    @Column(name = "content")
    private String content;

    @Column(name = "posting_title")
    private String postingTitle;

    @PrePersist
    public void prePersist() {
        // 다른 설정이 있다면 제거하고 postingDate 설정만 남기세요.
        this.postingDate = LocalDateTime.now();
    }

}
