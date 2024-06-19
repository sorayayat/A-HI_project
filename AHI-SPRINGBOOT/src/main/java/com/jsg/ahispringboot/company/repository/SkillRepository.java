package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    List<Skill> findByPosting(Posting posting);

    List<Skill> findByPostingPostingCode(Integer postingCode);
}
