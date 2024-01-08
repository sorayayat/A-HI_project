package com.jsg.ahispringboot.member.controller;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.ConfirmTokenDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.login.CustomUserDetail;
import com.jsg.ahispringboot.member.service.MemberService;
import com.jsg.ahispringboot.member.utils.FileProcess;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberServiceImpl;


    @GetMapping("/email_duplication_check")
    public boolean emailDuplicationCheck(@RequestParam String email) {
        boolean result = memberServiceImpl.emailDuplicationCheck(email);
        return result;
    }

    @GetMapping("/phoneNumber_duplication_check")
    public boolean phoneNumberDuplicationCheck(@RequestParam String phoneNumber) {
        boolean result = memberServiceImpl.phoneNumberDuplicationCheck(phoneNumber);
        return result;
    }

    @PostMapping("/signup")
    public Long memberSignup(@RequestBody MemberDto memberDto) {
        Long signup = memberServiceImpl.signup(memberDto);
        return signup;
    }

    @PostMapping("/signupCompany")
    public Long companySignup(@ModelAttribute CompanyDto companyDto, @RequestParam(required = false) MultipartFile logo) {
        Long signup = memberServiceImpl.companySignup(companyDto, logo);
        return signup;
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
    public void findPwd(@RequestBody MemberDto memberDto) {
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
    public void memberInfoUpdate(@RequestBody MemberDto memberDto, Authentication Authentication) {
        memberServiceImpl.memberInfoUpdate(Authentication, memberDto);
    }

    @GetMapping("/member/infoCompany")
    public CompanyDto company(@AuthenticationPrincipal CustomUserDetail customUserDetail) {
        String logo = memberServiceImpl.findLogo(customUserDetail.getMemberEntity().getCompanyEntity().getCompanyId());
        CompanyDto companyDto = CompanyDto
                .builder()
                .memberId(customUserDetail.getPk())
                .companyId(customUserDetail.getMemberEntity().getCompanyEntity().getCompanyId())
                .email(customUserDetail.getUsername())
                .name(customUserDetail.getRealName())
                .phoneNumber(customUserDetail.getPhoneNumber())
                .company(customUserDetail.getMemberEntity().getCompanyEntity().getCompany())
                .companyType(customUserDetail.getMemberEntity().getCompanyEntity().getCompanyType())
                .employeesNumber(customUserDetail.getMemberEntity().getCompanyEntity().getEmployeesNumber())
                .establishmentDate(customUserDetail.getMemberEntity().getCompanyEntity().getEstablishmentDate())
                .companyHomepage(customUserDetail.getMemberEntity().getCompanyEntity().getCompanyHomepage())
                .logoServer(logo)
                .build();
        return companyDto;
    }

    @PutMapping("/member/company_info_update")
    public void companyInfoUpdate(@ModelAttribute CompanyDto companyDto, Authentication authentication, @RequestParam(required = false) MultipartFile logo) {
        log.info("com={},mem={}", companyDto.getCompanyId(), companyDto.getMemberId());
        memberServiceImpl.companyInfoUpdate(companyDto, authentication, logo);
    }

    @DeleteMapping("/member/withdrawal")
    public boolean withdrawal(@RequestBody MemberDto memberDto) {
        memberServiceImpl.withdrawal(memberDto);
        return true;
    }

    @GetMapping("/in/member/myPage")
    public String myPage(@RequestParam Long memberId) {
        String result = memberServiceImpl.myPage(memberId);
        return result;
    }

    @PutMapping("/confirmCheck")
    public boolean confirmCheck(@RequestBody ConfirmTokenDto confirmTokenDto) {
        log.info("id={},token={}",confirmTokenDto.getId(),confirmTokenDto.getToken());
        boolean result = memberServiceImpl.confirmCheck(confirmTokenDto);
        return result;
    }

    @PostMapping("/in/member/before/changePwd")
    public boolean beforeChangePwd(@RequestBody MemberDto memberDto){
        boolean result = memberServiceImpl.beforeChangePwd(memberDto);
        return result;
    }
    @PutMapping("/in/member/changePwd")
    public boolean changePwd(@RequestBody MemberDto memberDto){
        boolean result = memberServiceImpl.changePwd(memberDto);
        return result;
    }
    @GetMapping("/rank/post")
    public String rankPost(){
        String result = memberServiceImpl.countPostLike();
        log.info("rs={}",result);
        return result;
    }

}
