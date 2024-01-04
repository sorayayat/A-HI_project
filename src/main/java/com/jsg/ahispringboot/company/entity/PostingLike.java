package com.jsg.ahispringboot.company.entity;

import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Entity
@IdClass(LikeId.class)
@Table(name = "posting_like")
@Data
@ToString
public class PostingLike {
    @Id
    @ManyToOne
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    @Id
    @ManyToOne
    @JoinColumn(name = "posting_code")
    private Posting posting;

}