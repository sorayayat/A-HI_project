package com.jsg.ahispringboot.inspection.dto;

import com.jsg.ahispringboot.inspection.entity.Resume;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IntrodictionDTO {
    private Long introductionCode;
    private String title;
    private String content;
    private Resume resume;

}
