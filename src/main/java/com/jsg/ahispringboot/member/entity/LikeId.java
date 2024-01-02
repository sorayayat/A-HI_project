package com.jsg.ahispringboot.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeId implements Serializable {
    private Long memberEntity;
    private Integer posting;

}
