package com.jsg.ahispringboot.inspection.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jsg.ahispringboot.inspection.entity.Resume;

@Repository
public interface InspectionRepository extends JpaRepository<Resume, Long> {

    @Query(value = "select r from Resume where r.memberId = :memberId")
    public List<Resume> FindById(Long memberId);

}
