package com.jsg.ahispringboot.inspection.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jsg.ahispringboot.inspection.entity.Resume;

@Repository
public interface InspectionRepository extends JpaRepository<Resume, Long> {

    @Query(value = "select r from Resume r where r.member.id = :memberId")
    public List<Resume> FindById(@Param("memberId") Long memberId);

    @Query(value = "select r from Resume r join member m on r.member.id = m.id where r.resumeCode = :resumeCode and m.id = :memberId ")
    public Resume findResumeCode(@Param("resumeCode") Long resumeCode, @Param("memberId") Long memberId);

}
