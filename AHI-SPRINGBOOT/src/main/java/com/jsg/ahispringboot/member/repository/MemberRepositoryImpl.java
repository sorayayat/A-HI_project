package com.jsg.ahispringboot.member.repository;

import com.jsg.ahispringboot.company.entity.PostingLike;
import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.dto.ConfirmTokenDto;
import com.jsg.ahispringboot.member.dto.MemberDto;
import com.jsg.ahispringboot.member.entity.*;
import com.jsg.ahispringboot.member.login.CustomUserDetail;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
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
    public MemberEntity signup(MemberEntity memberEntity) {
        MemberEntity memberEntity1 = memberEntity;
        em.persist(memberEntity1);
        return memberEntity1;
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
    public MemberEntity companySignup(MemberEntity memberEntity) {
        MemberEntity memberEntity1 = memberEntity;
        em.persist(memberEntity1);
        return memberEntity1;
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

    @Transactional
    @Override
    public UserDetails updateCompany(CompanyDto companyDto) {
        MemberEntity memberEntity1 = em.find(MemberEntity.class, companyDto.getMemberId());
        memberEntity1.setName(companyDto.getName());
        memberEntity1.setPhoneNumber(companyDto.getPhoneNumber());
        memberEntity1.getCompanyEntity().setCompany(companyDto.getCompany());
        memberEntity1.getCompanyEntity().setCompanyType(companyDto.getCompanyType());
        memberEntity1.getCompanyEntity().setCompanyHomepage(companyDto.getCompanyHomepage());
        memberEntity1.getCompanyEntity().setEmployeesNumber(companyDto.getEmployeesNumber());
        memberEntity1.getCompanyEntity().setEstablishmentDate(companyDto.getEstablishmentDate());
        return new CustomUserDetail(memberEntity1);
    }

    @Transactional(readOnly = true)
    public List<PostingLike> myPagePostingLike(Long memberId) {
        return em.createQuery(
                "SELECT pl FROM PostingLike pl WHERE pl.memberEntity.id = :memberId", PostingLike.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public LogoEntity findLogo(Long companyId) {
        CompanyEntity companyEntity = em.find(CompanyEntity.class, companyId);
        return companyEntity.getLogoEntity();
    }

    @Transactional
    @Override
    public void updateLogo(LogoEntity logoEntity) {
        LogoEntity logoEntity1 = em.find(LogoEntity.class, logoEntity.getLogoId());
        logoEntity1.setOriginalName(logoEntity.getOriginalName());
        logoEntity1.setServerName(logoEntity.getServerName());
    }

    @Transactional
    @Override
    public void confirmSave(ConfirmTokenEntity confirmTokenEntity) {
        em.persist(confirmTokenEntity);
    }

    @Transactional
    @Override
    public boolean confirmDelete(ConfirmTokenEntity confirmTokenEntity) {
        System.out.println("confirmTokenEntity.getMemberEntity() = " + confirmTokenEntity.getMemberEntity());
        ConfirmTokenEntity confirmTokenEntity1 = em.find(ConfirmTokenEntity.class,
                confirmTokenEntity.getMemberEntity().getId());
        if (confirmTokenEntity1 == null)
            return false;
        if (confirmTokenEntity.getToken().equals(confirmTokenEntity1.getToken())) {
            em.remove(confirmTokenEntity1);
            return true;
        } else {
            return false;
        }

    }

    @Transactional
    @Override
    public void roleUpdate(MemberEntity memberEntity) {
        MemberEntity memberEntity1 = em.find(MemberEntity.class, memberEntity.getId());
        memberEntity1.setRole(memberEntity.getRole());
    }

    @Override
    @Transactional
    public List<Object[]> countPostLike() {
        TypedQuery<Object[]> query = em.createQuery(
                "SELECT e.posting, COUNT(e) FROM PostingLike e GROUP BY e.posting ORDER BY COUNT(e) DESC",
                Object[].class);

        query.setFirstResult(0);
        query.setMaxResults(10);

        List<Object[]> results = query.getResultList();

        return results;
    }

    public MemberEntity findById(Long memberId) {
        MemberEntity member = em.find(MemberEntity.class, memberId);
        return member;
    }

    // @Transactional
    // @Override
    // public UserDetails updateCompany(CompanyDto companyDto) {
    // MemberEntity memberEntity1 = em.find(MemberEntity.class,
    // companyDto.getCompanyId());
    // memberEntity1.setName(companyDto.getName());
    // memberEntity1.setPhoneNumber(companyDto.getPhoneNumber());
    // memberEntity1.getCompanyEntity().setCompany(companyDto.getCompany());
    // memberEntity1.getCompanyEntity().setCompanyType(companyDto.getCompanyType());
    // memberEntity1.getCompanyEntity().setCompanyHomepage(companyDto.getCompanyHomepage());
    // memberEntity1.getCompanyEntity().setEmployeesNumber(companyDto.getEmployeesNumber());
    // memberEntity1.getCompanyEntity().setEstablishmentDate(companyDto.getEstablishmentDate());
    // return new CustomUserDetail(memberEntity1);
    // }
}
