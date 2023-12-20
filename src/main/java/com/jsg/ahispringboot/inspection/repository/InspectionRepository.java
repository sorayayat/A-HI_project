package com.jsg.ahispringboot.inspection.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jsg.ahispringboot.inspection.entity.File;

@Repository
public interface InspectionRepository extends JpaRepository<File, Long> {

    @Query(value = "select f from File f where f.memberId = :memberId and f.fileType = '자소서'")
    public List<File> FindById(Long memberId);

}
