package com.jsg.ahispringboot.member.service;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;

public interface MemberService {
    boolean emailDuplicationCheck(String email);

    void signup(MemberDto memberDto);

    void companySignup(CompanyDto companyDto);

    MemberDto findInfo(MemberDto memberDto);

    void findPwd(MemberDto memberDto);
}
