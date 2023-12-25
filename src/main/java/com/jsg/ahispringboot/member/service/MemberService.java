package com.jsg.ahispringboot.member.service;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import org.springframework.security.core.Authentication;

public interface MemberService {
    boolean emailDuplicationCheck(String email);

    void signup(MemberDto memberDto);

    void companySignup(CompanyDto companyDto);

    MemberDto findInfo(MemberDto memberDto);

    void findPwd(MemberDto memberDto);

    boolean phoneNumberDuplicationCheck(String phoneNumber);

    void memberInfoUpdate(Authentication authentication,MemberDto memberDto);

    // void companyInfoUpdate(CompanyDto companyDto, Authentication authentication);

    void withdrawal(MemberDto memberDto);
}
