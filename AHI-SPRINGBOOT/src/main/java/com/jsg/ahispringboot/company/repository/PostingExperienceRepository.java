package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.PostingExperience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostingExperienceRepository extends JpaRepository<PostingExperience, Integer> {
    List<PostingExperience> findByPosting(Posting posting);

    List<PostingExperience> findByPostingPostingCode(Integer postingCode);
}
