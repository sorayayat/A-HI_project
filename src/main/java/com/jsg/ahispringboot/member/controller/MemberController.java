package com.jsg.ahispringboot.member.controller;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.login.CustomUserDetail;
import com.jsg.ahispringboot.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberServiceImpl;


    @GetMapping("/email_duplication_check")
    public boolean emailDuplicationCheck(@RequestParam String email) throws IOException {
        boolean result = memberServiceImpl.emailDuplicationCheck(email);
        return true;
    }
    @GetMapping("/phoneNumber_duplication_check")
    public boolean phoneNumberDuplicationCheck(@RequestParam String phoneNumber) {
        boolean result = memberServiceImpl.phoneNumberDuplicationCheck(phoneNumber);
        return result;
    }
    @PostMapping("/signup")
    public String memberSignup(@RequestBody MemberDto memberDto) {
        log.info("전번={}",memberDto.getPhoneNumber().toString());
         memberServiceImpl.signup(memberDto);
        return "";
    }

    @PostMapping("/signupCompany")
    public String companySignup(@RequestBody CompanyDto companyDto) {
        log.info("전번={}",companyDto.getPhoneNumber().toString());
        memberServiceImpl.companySignup(companyDto);
        return "";
    }


    @PostMapping("/find_info")
    public MemberDto findInfo(@RequestBody MemberDto memberDto) {
        MemberDto info = memberServiceImpl.findInfo(memberDto);

        if (info != null) {
            log.info("email={}", info.getEmail());
            info.setCheck("success");
            return info;
        } else {
            MemberDto memberDto1 = MemberDto.builder()
                    .check("fail")
                    .build();
            return memberDto1;
        }
    }
    @PutMapping("/find_pwd")
    public void findPwd(@RequestBody MemberDto memberDto){
    memberServiceImpl.findPwd(memberDto);
    }


    @GetMapping("/member/info")
    public MemberDto user(@AuthenticationPrincipal CustomUserDetail customUserDetail) {
        MemberDto memberDto = MemberDto.builder()
                .id(customUserDetail.getPk())
                .email(customUserDetail.getUsername())
                .name(customUserDetail.getRealName())
                .phoneNumber(customUserDetail.getPhoneNumber())
                .build();
        return memberDto;
    }

    @PutMapping("/member/info_update")
    public void memberInfoUpdate(@RequestBody MemberDto memberDto,Authentication Authentication){
        memberServiceImpl.memberInfoUpdate(Authentication,memberDto);
    }
    // @GetMapping("/member/infoCompany")
    // public CompanyDto company(@AuthenticationPrincipal CustomUserDetail customUserDetail){
    //     CompanyDto companyDto = CompanyDto
    //             .builder()
    //             .companyId(customUserDetail.getPk())
    //             .email(customUserDetail.getUsername())
    //             .name(customUserDetail.getRealName())
    //             .phoneNumber(customUserDetail.getPhoneNumber())
    //             .company(customUserDetail.company())
    //             .companyType(customUserDetail.companyType())
    //             .employeesNumber(customUserDetail.employeesNumber())
    //             .establishmentDate(customUserDetail.establishmentDate())
    //             .companyHomepage(customUserDetail.companyHomepage())
    //             .build();
    //     return companyDto;
    // }
    // @PutMapping("/member/company_info_update")
    // public void companyInfoUpdate(@RequestBody CompanyDto companyDto,Authentication authentication){
    //     memberServiceImpl.companyInfoUpdate(companyDto, authentication);

    // }
    @DeleteMapping("/member/withdrawal")
    public boolean withdrawal(@RequestBody MemberDto memberDto){
        memberServiceImpl.withdrawal(memberDto);
        return true;
    }



}
