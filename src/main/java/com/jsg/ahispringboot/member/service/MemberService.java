package com.jsg.ahispringboot.member.service;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    boolean emailDuplicationCheck(String email);

    void signup(MemberDto memberDto);

    void companySignup(CompanyDto companyDto, MultipartFile logo);

    MemberDto findInfo(MemberDto memberDto);

    void findPwd(MemberDto memberDto);

    boolean phoneNumberDuplicationCheck(String phoneNumber);

    void memberInfoUpdate(Authentication authentication,MemberDto memberDto);

     void companyInfoUpdate(CompanyDto companyDto, Authentication authentication, MultipartFile logo);

    void withdrawal(MemberDto memberDto);

    String myPage(Long memberId);

    String findLogo(Long companyId);
}
