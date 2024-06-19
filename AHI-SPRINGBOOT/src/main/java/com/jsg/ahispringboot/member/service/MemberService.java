package com.jsg.ahispringboot.member.service;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.ConfirmTokenDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import jakarta.mail.MessagingException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    boolean emailDuplicationCheck(String email);

    Long signup(MemberDto memberDto) throws MessagingException;

    Long companySignup(CompanyDto companyDto, MultipartFile logo) throws MessagingException;

    MemberDto findInfo(MemberDto memberDto);

    void findPwd(MemberDto memberDto);

    boolean phoneNumberDuplicationCheck(String phoneNumber);

    void memberInfoUpdate(Authentication authentication,MemberDto memberDto);

    void companyInfoUpdate(CompanyDto companyDto, Authentication authentication, MultipartFile logo);

    void withdrawal(MemberDto memberDto);

    String myPage(Long memberId);

    String findLogo(Long companyId);

    boolean beforeChangePwd(MemberDto memberDto);

    boolean changePwd(MemberDto memberDto);

    void confirmMailSend(MemberEntity memberEntity) throws MessagingException;

    boolean confirmCheck(ConfirmTokenDto confirmTokenDto);

    String countPostLike();
}
