package com.jsg.ahispringboot.member.repository;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import org.springframework.security.core.userdetails.UserDetails;


public interface MemberRepository {

    MemberEntity findMember(String memberEmail,String phoneNumber);

    void signup(MemberEntity memberEntity);

    void companySignup(MemberEntity memberEntity);


    void updatePwd(MemberEntity member);

    UserDetails updateMember(MemberDto memberDto);

    // UserDetails updateCompany(CompanyDto companyDto);
}
