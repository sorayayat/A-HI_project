package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.WorkType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkTypeRepository extends JpaRepository<WorkType, Integer> {



    List<WorkType> findByPostingPostingCode(Integer postingCode);
}
