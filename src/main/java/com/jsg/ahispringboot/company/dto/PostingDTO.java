package com.jsg.ahispringboot.company.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PostingDTO {

    private Integer postingCode;

    private String postingDate;

    private String endDate;

    private int viewCount;

    private String location;

    private String position;

    private String closingForm;

    private String content;

    private String postingTitle;

    private List<String> selectedCareer;

    private List<String> selectedConditions;

    private List<String> selectedSkills;
}

