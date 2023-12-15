package com.jsg.ahispringboot.member.controller;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/signup")
    public String memberSignup(@RequestBody MemberDto memberDto) {
        memberServiceImpl.signup(memberDto);
        return "";
    }

    @PostMapping("/signupCompany")
    public String companySignup(@RequestBody CompanyDto companyDto) {

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

}
