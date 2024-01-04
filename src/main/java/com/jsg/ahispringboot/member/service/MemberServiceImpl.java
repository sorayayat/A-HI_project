package com.jsg.ahispringboot.member.service;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import com.jsg.ahispringboot.member.mapper.MemberTransMapper;
import com.jsg.ahispringboot.member.memberEnum.MemberRole;
import com.jsg.ahispringboot.member.repository.MemberRepository;
import com.jsg.ahispringboot.member.repository.MemberRepositoryDataJpa;
import com.jsg.ahispringboot.member.utils.MailSend;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;
import jakarta.servlet.http.HttpSession;


@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepositoryImpl;
    private final MemberRepositoryDataJpa memberRepositoryDataJpa;
    private final PasswordEncoder passwordEncoder;
    private final MailSend mailSend;
    private final HttpSession session;
    @Override
    public boolean emailDuplicationCheck(String email) {
       MemberEntity member = memberRepositoryImpl.findMember(email,null);
        if(member!=null){
            return false;
        }
        return true;
    }

    @Override
    public boolean phoneNumberDuplicationCheck(String phoneNumber) {
        MemberEntity member = memberRepositoryImpl.findMember(null,phoneNumber);
        if(member!=null){
            return false;
        }
        return true;
    }

    @Override
    public void signup(MemberDto memberDto) {
        MemberEntity memberEntity = MemberTransMapper.INSTANCE.dtoToEntity(memberDto);
        memberEntity.setPassword(passwordEncoder.encode(memberEntity.getPassword()));
        memberEntity.setRole(MemberRole.ROLE_MEMBER);
        memberRepositoryImpl.signup(memberEntity);
    }

    @Override
    public void companySignup(CompanyDto companyDto) {
        CompanyEntity companyEntity = MemberTransMapper.INSTANCE.cDtoToEntity(companyDto);
        MemberEntity memberEntity = MemberTransMapper.INSTANCE.cDtoToMemberEntity(companyDto);
        memberEntity.setPassword(passwordEncoder.encode(memberEntity.getPassword()));
        memberEntity.setRole(MemberRole.ROLE_COMPANY);
        // memberEntity.setCompanyEntity(companyEntity);
        memberRepositoryImpl.companySignup(memberEntity);
    }

    @Override
    public MemberDto findInfo(MemberDto memberDto) {
        MemberDto findDto;
        if(memberDto!=null){
            MemberEntity member = memberRepositoryImpl.findMember(memberDto.getEmail(), memberDto.getPhoneNumber());
            if (member != null) {
                 findDto = MemberTransMapper.INSTANCE.entityToDto(member);
             return findDto;
            }

        }
        return null;
    }
    @Override
    public void findPwd(MemberDto memberDto) {
        MemberEntity member = memberRepositoryImpl.findMember(memberDto.getEmail(), memberDto.getPhoneNumber());

        if(member!=null && member.getEmail().equals(memberDto.getEmail())) {
            String uuid = UUID.randomUUID().toString();
            String newNotEncodePassword = uuid.substring(0, 14);
            String newPassword = passwordEncoder.encode(newNotEncodePassword);
            mailSend.sendEmail(memberDto.getEmail(),"jsg 변경된 PASSWORD 입니다.",newNotEncodePassword);
            member.setPassword(newPassword);
            memberRepositoryImpl.updatePwd(member);
        }
    }


    @Override
    public void memberInfoUpdate(Authentication authentication, MemberDto memberDto) {
        UserDetails userDetails = memberRepositoryImpl.updateMember(memberDto);
        Authentication newAuth =
                new UsernamePasswordAuthenticationToken
                        (userDetails, authentication.getCredentials(), userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }

     @Override
     public void companyInfoUpdate(CompanyDto companyDto, Authentication authentication) {
          UserDetails userDetails=memberRepositoryImpl.updateCompany(companyDto);
         Authentication newAuth =
                 new UsernamePasswordAuthenticationToken
                         (userDetails, authentication.getCredentials(), userDetails.getAuthorities());
         SecurityContextHolder.getContext().setAuthentication(newAuth);
     }

    @Override
    public void withdrawal(MemberDto memberDto) {
        memberRepositoryDataJpa.deleteById(memberDto.getId());
        session.invalidate();
    }
}
