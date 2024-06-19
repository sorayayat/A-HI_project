package com.jsg.ahispringboot.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.PostingLike;
import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.ConfirmTokenDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.dto.PostingInfoDTO;
import com.jsg.ahispringboot.member.entity.*;
import com.jsg.ahispringboot.member.mapper.MemberTransMapper;
import com.jsg.ahispringboot.member.memberEnum.MemberRole;
import com.jsg.ahispringboot.member.repository.MemberRepository;
import com.jsg.ahispringboot.member.repository.MemberRepositoryDataJpa;
import com.jsg.ahispringboot.member.utils.FileProcess;
import com.jsg.ahispringboot.member.utils.MailSend;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepositoryImpl;
    private final MemberRepositoryDataJpa memberRepositoryDataJpa;
    private final PasswordEncoder passwordEncoder;
    private final MailSend mailSend;
    private final HttpSession session;
    private final FileProcess fileProcess;
    private final ModelMapper modelMapper;
    @Value("${app.file-storage.directory}")
    private String fileStoragePath;

    @Override
    public boolean emailDuplicationCheck(String email) {
        MemberEntity member = memberRepositoryImpl.findMember(email, null);
        if (member != null) {
            return false;
        }
        return true;
    }

    @Override
    public boolean phoneNumberDuplicationCheck(String phoneNumber) {
        MemberEntity member = memberRepositoryImpl.findMember(null, phoneNumber);
        if (member != null) {
            return false;
        }
        return true;
    }

    @Override
    public Long signup(MemberDto memberDto) throws MessagingException {
        MemberEntity memberEntity = MemberTransMapper.INSTANCE.dtoToEntity(memberDto);
        memberEntity.setPassword(passwordEncoder.encode(memberEntity.getPassword()));
        memberEntity.setRole(MemberRole.ROLE_GUEST);
        MemberEntity signup = memberRepositoryImpl.signup(memberEntity);
        signup.setRole(MemberRole.ROLE_MEMBER);
        confirmMailSend(signup);
        return signup.getId();
    }

    @Override
    public Long companySignup(CompanyDto companyDto, MultipartFile logo) throws MessagingException {
        LogoEntity logoEntity;
        if (logo != null) {
            logoEntity = fileProcess.fileSave(logo);
        } else {
            logoEntity = LogoEntity
                    .builder()
                    .path(fileStoragePath)
                    .originalName("등록된 사진이 없습니다.")
                    .serverName("default.jpg")
                    .build();
        }
        MemberEntity memberEntity = setCompany(companyDto);
        memberEntity.getCompanyEntity().setLogoEntity(logoEntity);
        MemberEntity memberEntity1 = memberRepositoryImpl.companySignup(memberEntity);
        memberEntity1.setRole(MemberRole.ROLE_COMPANY);
        confirmMailSend(memberEntity1);
        return memberEntity1.getId();
    }

    public MemberEntity setCompany(CompanyDto companyDto) {
        CompanyEntity companyEntity = MemberTransMapper.INSTANCE.cDtoToEntity(companyDto);
        MemberEntity memberEntity = MemberTransMapper.INSTANCE.cDtoToMemberEntity(companyDto);
        memberEntity.setPassword(passwordEncoder.encode(memberEntity.getPassword()));
        memberEntity.setRole(MemberRole.ROLE_COMPANY);
        memberEntity.setCompanyEntity(companyEntity);
        return memberEntity;
    }

    @Override
    public MemberDto findInfo(MemberDto memberDto) {
        MemberDto findDto;
        if (memberDto != null) {
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

        if (member != null && member.getEmail().equals(memberDto.getEmail())) {
            String uuid = UUID.randomUUID().toString();
            String newNotEncodePassword = uuid.substring(0, 14);
            String newPassword = passwordEncoder.encode(newNotEncodePassword);
            mailSend.sendNewPwd(memberDto.getEmail(), "jsg 변경된 PASSWORD 입니다.", newNotEncodePassword);
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
    public void companyInfoUpdate(CompanyDto companyDto, Authentication authentication, MultipartFile logo) {
        if (logo != null) {
            LogoEntity oldLogo = memberRepositoryImpl.findLogo(companyDto.getCompanyId());
            LogoEntity logoEntity = fileProcess.fileDelete(logo, oldLogo);
            memberRepositoryImpl.updateLogo(logoEntity);
        }
        UserDetails userDetails = memberRepositoryImpl.updateCompany(companyDto);
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

    @Override
    public String myPage(Long memberId) {
        List<PostingLike> postingLikes = memberRepositoryImpl.myPagePostingLike(memberId);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        if (postingLikes != null && !postingLikes.isEmpty()) {
            try {
                List<String> postingsJson = postingLikes.stream()
                        .map(postingLike -> {
                            try {
                                log.info("post={}", objectMapper.writeValueAsString(postingLike.getPosting()));
                                return objectMapper.writeValueAsString(postingLike.getPosting());
                            } catch (Exception e) {
                                e.printStackTrace();
                                return null;
                            }
                        })
                        .collect(Collectors.toList());

                return objectMapper.writeValueAsString(postingsJson);
            } catch (Exception e) {
                e.printStackTrace();
                return "Error converting to JSON";
            }
        } else {
            return "no data";
        }
    }

    @Override
    public String findLogo(Long companyId) {
        LogoEntity logo = memberRepositoryImpl.findLogo(companyId);
        return logo.getServerName();
    }

    @Override
    public boolean beforeChangePwd(MemberDto memberDto) {
        Optional<MemberEntity> byId = memberRepositoryDataJpa.findById(memberDto.getId());
        if (byId.isPresent()) {
            String dbPwd = byId.get().getPassword();
            boolean matches = passwordEncoder.matches(memberDto.getPassword(), dbPwd);
            return matches;
        } else
            return false;
    }

    @Override
    public boolean changePwd(MemberDto memberDto) {
        Optional<MemberEntity> byId = memberRepositoryDataJpa.findById(memberDto.getId());
        if (byId.isPresent()) {
            memberDto.setPassword(passwordEncoder.encode(memberDto.getPassword()));
            MemberEntity memberEntity = MemberTransMapper.INSTANCE.dtoToEntity(memberDto);
            memberRepositoryImpl.updatePwd(memberEntity);
            return true;
        }
        return false;
    }

    @Override
    public void confirmMailSend(MemberEntity memberEntity) throws MessagingException {
        String token = memberEntity.getRole().toString() + UUID.randomUUID().toString();
        String verificationUrl = "http://localhost:3000/verify?token=" + token;
        ConfirmTokenEntity confirmTokenEntity = ConfirmTokenEntity.builder()
                .memberEntity(memberEntity)
                .token(token)
                .build();
        confirmTokenEntity.getMemberEntity().setRole(MemberRole.ROLE_GUEST);
        memberRepositoryImpl.confirmSave(confirmTokenEntity);
        mailSend.sendEmail(memberEntity.getEmail(), "jsg 가입인증 메일입니다. ", verificationUrl = "http://localhost:3000/verify?token=" + token + "&id=" + memberEntity.getId());
    }

    @Override
    public boolean confirmCheck(ConfirmTokenDto confirmTokenDto) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setId(confirmTokenDto.getId());
        ConfirmTokenEntity confirmTokenEntity = ConfirmTokenEntity.builder()
                .token(confirmTokenDto.getToken())
                .memberEntity(memberEntity)
                .build();
        boolean result = memberRepositoryImpl.confirmDelete(confirmTokenEntity);
        if (!result) return false;
        if (confirmTokenDto.getToken().contains("MEMBER"))
            memberEntity.setRole(MemberRole.ROLE_MEMBER);
        else if (confirmTokenDto.getToken().contains("COMPANY"))
            memberEntity.setRole(MemberRole.ROLE_COMPANY);
        memberRepositoryImpl.roleUpdate(memberEntity);
        return true;

    }

    @Override
    public String countPostLike() {
        List<Object[]> results = memberRepositoryImpl.countPostLike();
        List<PostingInfoDTO> postingLikesDTOs = results.stream()
                .map(result -> new PostingInfoDTO((Posting) result[0], (Long) result[1]))
                .collect(Collectors.toList());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        String json;
        try {
            json = objectMapper.writeValueAsString(postingLikesDTOs);
            return json;
        } catch (Exception e) {
            // JSON 변환 중 발생한 예외 처리
            e.printStackTrace();
            json = "[]"; // 또는 적절한 오류 메시지 또는 핸들링
        }
        return json;
    }
}