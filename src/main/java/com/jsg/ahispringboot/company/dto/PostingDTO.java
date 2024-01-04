package com.jsg.ahispringboot.company.dto;

import com.jsg.ahispringboot.member.dto.CompanyDto;
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

    private String education;

    private int viewCount;

    private String location;

    private String position;

    private String closingForm;

    private String content;

    private String postingTitle;

    private String selectedCareer;

    private String selectedConditions;

    private String selectedSkills;

    private List<WorkTypeDTO> workTypeList;

    private List<SkillDTO> skillList;

    private List<PostingExperienceDTO> postingExperienceList;

    private CompanyDTO company;

    private String postingLike;
}

