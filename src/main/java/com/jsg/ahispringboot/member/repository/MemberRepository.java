package com.jsg.ahispringboot.member.repository;

import com.jsg.ahispringboot.company.entity.PostingLike;
import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.ConfirmTokenEntity;
import com.jsg.ahispringboot.member.entity.LogoEntity;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;


public interface MemberRepository {

    MemberEntity findMember(String memberEmail, String phoneNumber);

    MemberEntity signup(MemberEntity memberEntity);

    MemberEntity companySignup(MemberEntity memberEntity);


    void updatePwd(MemberEntity member);

    UserDetails updateMember(MemberDto memberDto);

    UserDetails updateCompany(CompanyDto companyDto);


    List<PostingLike> myPagePostingLike(Long memberId);

    LogoEntity findLogo(Long companyId);

    void updateLogo(LogoEntity logoEntity);

    void confirmSave(ConfirmTokenEntity confirmTokenEntity);

    boolean confirmDelete(ConfirmTokenEntity confirmTokenEntity);

    void roleUpdate(MemberEntity memberEntity);

    List<Object[]> countPostLike();



}
