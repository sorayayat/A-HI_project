package com.jsg.ahispringboot;

import com.jsg.ahispringboot.company.entity.*;
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
import java.time.LocalDate;
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
        String[] imageNames = {"loading1.jpg", "loading2.jpg", "loading3.jpg"};
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
        String[] companyTypes = {"5인이하기업", "중소기업", "중견기업", "대기업", "글로벌기업"};
        String[] companyNames = {"이엠테크", "it비즈", "it인터네셔날", "크립토", "엄브렐라", "테크원","멋쟁이사자","칙바이칙","파이브가이즈","에이원","브롱코","랜드로버","호호마켓","홈플러스","이마트","하이테크","현대로직","하이테크빌리지","포스원","오더나인","아이테크빌리지","남원상사","풍산"};

        company.setCompany(companyNames[new Random().nextInt(companyNames.length)] + " " + index);
        company.setEmployeesNumber(new Random().nextInt(1000));
        company.setCompanyType(companyTypes[new Random().nextInt(companyTypes.length)]);
        company.setEstablishmentDate(new Date(System.currentTimeMillis()));
        company.setCompanyHomepage("https://www." + company.getCompany().toLowerCase().replace(" ", "") + ".com");
        company.setLogoEntity(logo);
        return company;
    }

    private MemberEntity createMember(int index, CompanyEntity company) {
        MemberEntity member = new MemberEntity();
        String[] name = {"홍길동","홍두깨","고길동","희동이","마이콜","메타몽","이브이","제다이","바보","김길동","호랑이","디발라","서건창"};
        member.setEmail("user" + index + "@example.com");
        member.setName(name[new Random().nextInt(name.length)]);
        member.setPassword(BCryptPasswordEncoder.encode("password"));
        member.setPhoneNumber("010-1234-" + String.format("%04d", index));
        member.setRole(MemberRole.ROLE_COMPANY);
        member.setCompanyEntity(company);
        return member;
    }

    private Posting createPosting(int index, CompanyEntity company) {
        Posting posting = new Posting();
        String[] locations = {"서울", "부산", "대구", "인천", "광주","평양","개성공단","나주","봉평","개마고원","제주","강원","전남","전북","충청","수원","판교","구리"};
        String[] positions = {"풀스택","프론트","백","안드로이드"};
        String[] educationLevels = {"대학교 졸업", "석사 졸업", "박사 졸업"};
        String[] closingForms = {"온라인 지원", "이메일 지원", "방문 지원", "우편 지원"};

        posting.setPostingDate(LocalDateTime.now());
        posting.setEndDate(LocalDate.now().plusDays(new Random().nextInt(90)).toString()); // 90일 이내 무작위 마감일
        posting.setViewCount(new Random().nextInt(1000));
        posting.setLocation(locations[new Random().nextInt(locations.length)]);
        posting.setPosition(positions[new Random().nextInt(positions.length)]);
        posting.setClosingForm(closingForms[new Random().nextInt(closingForms.length)]);
        posting.setContent("저희 " + company.getCompany() + "에서 경험 있는 " + posting.getPosition() + "를 찾고 있습니다.");
        posting.setPostingTitle(posting.getPosition() + " 채용 공고 " + index);
        posting.setEducation(educationLevels[new Random().nextInt(educationLevels.length)]);
        posting.setCompany(company);

        // 추가 엔티티 생성 및 저장 (생략)
        // ...

        return posting;
    }
}
