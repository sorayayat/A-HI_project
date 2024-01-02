package com.jsg.ahispringboot.member.repository;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.LogoEntity;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import com.jsg.ahispringboot.member.entity.PostingLike;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;


public interface MemberRepository {

    MemberEntity findMember(String memberEmail,String phoneNumber);

    void signup(MemberEntity memberEntity);

    void companySignup(MemberEntity memberEntity);


    void updatePwd(MemberEntity member);

    UserDetails updateMember(MemberDto memberDto);

     UserDetails updateCompany(CompanyDto companyDto);

    List<PostingLike> myPagePostingLike(Long memberId);

    LogoEntity findLogo(Long companyId);

    void updateLogo(LogoEntity logoEntity);
}
