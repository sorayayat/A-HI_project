package com.jsg.ahispringboot.member.repository;

import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import org.springframework.transaction.annotation.Transactional;


public interface MemberRepository {

    MemberEntity findMember(String memberEmail,Long phoneNumber);

    void signup(MemberEntity memberEntity);

    void companySignup(MemberEntity memberEntity);


    void updatePwd(MemberEntity member);
}
