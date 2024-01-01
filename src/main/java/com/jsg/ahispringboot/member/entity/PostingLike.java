package com.jsg.ahispringboot.member.entity;

import com.jsg.ahispringboot.company.entity.Posting;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Entity
@IdClass(LikeId.class)
@Table(name = "posting_like")
@Data
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
