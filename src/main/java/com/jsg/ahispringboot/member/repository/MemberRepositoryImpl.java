package com.jsg.ahispringboot.member.repository;

import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import com.jsg.ahispringboot.member.login.CustomUserDetail;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.jsg.ahispringboot.member.entity.QMemberEntity.memberEntity;

@Repository
@Slf4j
public class MemberRepositoryImpl implements MemberRepository {

    private final EntityManager em;
    private final JPAQueryFactory query;

    public MemberRepositoryImpl(EntityManager em) {
        this.em = em;
        this.query = new JPAQueryFactory(em);
    }

    @Transactional
    @Override
    public void signup(MemberEntity memberEntity) {
        em.persist(memberEntity);
    }

    @Transactional(readOnly = true) // 이걸 옵셔널로 리턴주면 유니크가 아닌걸로 검색했을경우 사용못하고 값이 여러개니깐 list 로 주면 null 처리만 해주면 되고
    public MemberEntity findMember(String memberEmail, String phoneNumber) {
        List<MemberEntity> memberEntities = query
                .select(memberEntity)
                .from(memberEntity)
                .where(memberEmail(memberEmail), phoneNumber(phoneNumber))
                .fetch();

        if (memberEntities.isEmpty()) {
            MemberEntity memberEntity1 = null;
            memberEntities.add(memberEntity1);
        }

        return memberEntities.get(0);
    }

    private BooleanExpression memberEmail(String email) {
        if (StringUtils.hasText(email)) {
            return memberEntity.email.eq(email);
        }
        return null;
    }

    private BooleanExpression phoneNumber(String phoneNumber) {
        if (StringUtils.hasText(phoneNumber)) {
            return memberEntity.phoneNumber.eq(phoneNumber);
        }
        return null;
    }

    // private BooleanExpression phoneNumber(Long phoneNumber) {
    // if (phoneNumber != null && phoneNumber != 0) {
    // return memberEntity.phoneNumber.eq(phoneNumber);
    // }
    // return null;
    // }

    @Transactional
    @Override
    public void companySignup(MemberEntity memberEntity) {
        em.persist(memberEntity);
    }

    @Transactional
    @Override
    public void updatePwd(MemberEntity member) {
        MemberEntity memberEntity1 = em.find(MemberEntity.class, member.getId());
        memberEntity1.setPassword(member.getPassword());
    }

    @Transactional
    @Override
    public UserDetails updateMember(MemberDto memberDto) {
        MemberEntity memberEntity1 = em.find(MemberEntity.class, memberDto.getId());
        memberEntity1.setName(memberDto.getName());
        memberEntity1.setPhoneNumber(memberDto.getPhoneNumber());
        return new CustomUserDetail(memberEntity1);
    }

    // @Transactional
    // @Override
    // public UserDetails updateCompany(CompanyDto companyDto) {
    //     MemberEntity memberEntity1 = em.find(MemberEntity.class, companyDto.getCompanyId());
    //     memberEntity1.setName(companyDto.getName());
    //     memberEntity1.setPhoneNumber(companyDto.getPhoneNumber());
    //     memberEntity1.getCompanyEntity().setCompany(companyDto.getCompany());
    //     memberEntity1.getCompanyEntity().setCompanyType(companyDto.getCompanyType());
    //     memberEntity1.getCompanyEntity().setCompanyHomepage(companyDto.getCompanyHomepage());
    //     memberEntity1.getCompanyEntity().setEmployeesNumber(companyDto.getEmployeesNumber());
    //     memberEntity1.getCompanyEntity().setEstablishmentDate(companyDto.getEstablishmentDate());
    //     return new CustomUserDetail(memberEntity1);
    // }
}
