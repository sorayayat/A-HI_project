package com.jsg.ahispringboot.member.repository;

import com.jsg.ahispringboot.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepositoryDataJpa extends JpaRepository <MemberEntity,Long> {
    Optional<MemberEntity> findByEmail(String email);

}
