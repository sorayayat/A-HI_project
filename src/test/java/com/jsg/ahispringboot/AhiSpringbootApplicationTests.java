package com.jsg.ahispringboot;

import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.PostingExperience;
import com.jsg.ahispringboot.company.entity.Skill;
import com.jsg.ahispringboot.company.entity.WorkType;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import com.jsg.ahispringboot.member.entity.LogoEntity;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import com.jsg.ahispringboot.member.memberEnum.MemberRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootTest
public class AhiSpringbootApplicationTests {

    @Autowired
    private EntityManager entityManager;
    @Autowired
    private  PasswordEncoder BCryptPasswordEncoder;


    @Test
    @Transactional
    @Commit
    public void insertTestData2() {
        for (int i = 0; i < 100; i++) {
            LogoEntity logo = createAndPersistLogo(i);
            CompanyEntity company = createCompany(i, logo);
            entityManager.persist(company);
            MemberEntity member = createMember(i, company);
            entityManager.persist(member);
            Posting posting = createPosting(i, company);
            entityManager.persist(posting);
            List<PostingExperience> experiences = createDummyPostingExperiences(posting);
            experiences.forEach(entityManager::persist);

            List<Skill> skills = createDummySkills(posting);
            skills.forEach(entityManager::persist);

            List<WorkType> workTypes = createDummyWorkTypes(posting);
            workTypes.forEach(entityManager::persist);
        }
    }


    private List<PostingExperience> createDummyPostingExperiences(Posting posting) {
        List<PostingExperience> experiences = new ArrayList<>();
        PostingExperience experience = new PostingExperience();
        experience.setExperienceLevel("경력 3년 이상");
        experience.setPosting(posting);
        experiences.add(experience);
        return experiences;
    }

    private List<Skill> createDummySkills(Posting posting) {
        List<Skill> skills = new ArrayList<>();
        Skill skill = new Skill();
        skill.setSkillName("Java");
        skill.setPosting(posting);
        skills.add(skill);
        return skills;
    }

    private List<WorkType> createDummyWorkTypes(Posting posting) {
        List<WorkType> workTypes = new ArrayList<>();
        WorkType workType = new WorkType();
        workType.setWorkConditions("정규직");
        workType.setPosting(posting);
        workTypes.add(workType);
        return workTypes;
    }

    @Test
    @Transactional
    @Commit
    public void createDummyPostingLikes() {
        Random random = new Random();
        for (long memberId = 1; memberId <= 100; memberId++) {
            for (int postingId = 1; postingId <= 100; postingId++) {
                if (random.nextDouble() < 0.1) { // 10% 확률로 좋아요 생성
                    PostingLike postingLike = createDummyPostingLike(memberId, postingId);
                    entityManager.persist(postingLike);
                }
            }
        }
    }

    private PostingLike createDummyPostingLike(long memberId, int postingId) {
        MemberEntity member = entityManager.find(MemberEntity.class, memberId);
        Posting posting = entityManager.find(Posting.class, postingId);

        PostingLike postingLike = new PostingLike();
        postingLike.setMemberEntity(member);
        postingLike.setPosting(posting);

        return postingLike;
    }



    private LogoEntity createAndPersistLogo(int index) {
        String[] imageNames = {"jingjing.jpg", "loading1.jpg", "loading2.jpg", "loading3.jpg"};
        String imageName = imageNames[new Random().nextInt(imageNames.length)];
        String imagePath = "E:\\hi28\\AHI-SPRINGBOOT\\logoimg\\";

        LogoEntity logo = new LogoEntity();
        logo.setOriginalName(imageName);
        logo.setServerName(imageName);
        logo.setPath(imagePath);
        entityManager.persist(logo);
        return logo;
    }

    private CompanyEntity createCompany(int index, LogoEntity logo) {
        CompanyEntity company = new CompanyEntity();
        company.setCompany("Company " + index);
        company.setEmployeesNumber(new Random().nextInt(1000));
        company.setCompanyType("Type " + index);
        company.setEstablishmentDate(new Date(System.currentTimeMillis()));
        company.setCompanyHomepage("https://homepage" + index + ".com");
        company.setLogoEntity(logo);
        return company;
    }

    private MemberEntity createMember(int index, CompanyEntity company) {
        MemberEntity member = new MemberEntity();
        member.setEmail("user" + index + "@example.com");
        member.setName("User " + index);
        member.setPassword(BCryptPasswordEncoder.encode("password"));
        member.setPhoneNumber("010-1234-" + String.format("%04d", index));
        member.setRole(MemberRole.ROLE_COMPANY);
        member.setCompanyEntity(company);
        return member;
    }

    private Posting createPosting(int index, CompanyEntity company) {
        Posting posting = new Posting();
        posting.setPostingDate(LocalDateTime.now());
        posting.setEndDate("2024-12-31");
        posting.setViewCount(new Random().nextInt(1000));
        posting.setLocation("서울");
        posting.setPosition("개발자");
        posting.setClosingForm("온라인 지원");
        posting.setContent("IT 기업에서 개발자를 채용합니다.");
        posting.setPostingTitle("개발자 채용 공고 " + index);
        posting.setEducation("대학교 졸업 이상");
        posting.setCompany(company);

        // 추가 엔티티 생성 및 저장 (생략)
        // ...

        return posting;
    }
}
