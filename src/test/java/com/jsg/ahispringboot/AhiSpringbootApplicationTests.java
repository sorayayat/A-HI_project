package com.jsg.ahispringboot;

import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.PostingExperience;
import com.jsg.ahispringboot.company.entity.Skill;
import com.jsg.ahispringboot.company.entity.WorkType;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import com.jsg.ahispringboot.member.entity.PostingLike;
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
    private  PasswordEncoder passwordEncoder;


    @Test
    @Transactional
    @Commit
    public void testCreateRandomMembers() {
        for (int i = 0; i < 100; i++) {
            MemberEntity member = createRandomMember();
            entityManager.persist(member);
        }
    }

    private MemberEntity createRandomMember() {
        Random random = new Random();
        MemberEntity member = new MemberEntity();
        member.setEmail(randomString(new String[]{"John", "Jane", "Alice", "Bob", "Charlie"})
                + "@" + randomString(new String[]{"example.com", "test.com", "demo.org"}));
        member.setName(randomString(new String[]{"John", "Jane", "Alice", "Bob", "Charlie"}));
        member.setPassword(passwordEncoder.encode("password"));
        member.setPhoneNumber("123-456-" + String.format("%04d", random.nextInt(10000)));
        member.setRole(MemberRole.ROLE_MEMBER); // Assuming 'ROLE_MEMBER' is a valid enum constant

        // Assuming CompanyEntity is set up similarly
        // member.setCompanyEntity(createRandomCompany());

        return member;
    }

    private String randomString(String[] array) {
        Random random = new Random();
        return array[random.nextInt(array.length)];
    }
    @Test
    @Transactional
    @Commit
    public void createDummyCompanies() {
        for (int i = 0; i < 100; i++) {
            CompanyEntity company = createDummyCompany();
            entityManager.persist(company);
        }
    }

    private CompanyEntity createDummyCompany() {
        Random random = new Random();

        CompanyEntity company = new CompanyEntity();
        company.setCompany("회사" + random.nextInt(1000));
        company.setEmployeesNumber(random.nextInt(5000) + 1);
        company.setCompanyType("IT");
        company.setEstablishmentDate(new Date(System.currentTimeMillis()));
        company.setCompanyHomepage("http://www.company" + random.nextInt(1000) + ".com");

        // 임의의 MemberEntity 객체를 생성하거나 설정하세요.
        // 예: company.setMemberEntity(createDummyMember());

        return company;
    }


    @Test
    @Transactional
    @Commit
    public void createDummyPostings() {
        for (int i = 0; i < 100; i++) {
            Posting posting = createDummyPosting();
            entityManager.persist(posting);

            List<PostingExperience> experiences = createDummyPostingExperiences(posting);
            experiences.forEach(entityManager::persist);

            List<Skill> skills = createDummySkills(posting);
            skills.forEach(entityManager::persist);

            List<WorkType> workTypes = createDummyWorkTypes(posting);
            workTypes.forEach(entityManager::persist);
        }
    }

    private Posting createDummyPosting() {
        Posting posting = new Posting();
        posting.setPostingDate(LocalDateTime.now());
        posting.setEndDate("2024-12-31");
        posting.setViewCount(new Random().nextInt(1000));
        posting.setLocation("서울");
        posting.setPosition("개발자");
        posting.setClosingForm("온라인 지원");
        posting.setContent("IT 기업에서 개발자를 채용합니다.");
        posting.setPostingTitle("개발자 채용 공고");
        posting.setEducation("대학교 졸업 이상");

        // 새로운 CompanyEntity 객체 생성 및 할당
        CompanyEntity company = createDummyCompany(); // 이미 정의된 createDummyCompany 메소드 사용
        entityManager.persist(company); // 새로 생성된 CompanyEntity를 먼저 영속화
        posting.setCompany(company); // Posting 객체에 CompanyEntity 할당

        return posting;
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


}
