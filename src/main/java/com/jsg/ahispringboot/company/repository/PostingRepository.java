package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.entity.Posting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostingRepository extends JpaRepository<Posting , Integer> {
    Posting findByPostingCode(Integer postingCode);


//    @Query("select a,b  from Posting a left join WorkType b on (a.postingCode = b.posting.postingCode)")
//    List<Posting> findBySelectPosting();
}
