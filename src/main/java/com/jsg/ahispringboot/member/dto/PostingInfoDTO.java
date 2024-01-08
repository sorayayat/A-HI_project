package com.jsg.ahispringboot.member.dto;

import com.jsg.ahispringboot.company.entity.Posting;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostingInfoDTO {
    private Posting posting;
    private Long likesCount;

}
