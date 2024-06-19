package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository2 extends JpaRepository<MemberEntity, Integer> {

    MemberEntity findById(Long memberCode);
}
