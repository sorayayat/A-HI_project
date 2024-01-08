package com.jsg.ahispringboot.member.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "confirm_token")
@Getter
@Setter
public class ConfirmTokenEntity {

    @Id
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    private String token;


}
