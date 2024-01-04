package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.entity.Posting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostingRepository extends JpaRepository<Posting , Integer> {
    Posting findByPostingCode(Integer postingCode);

    @Query("select p from Posting p where p.postingCode in :matchingIds ")
    List<Posting> findBymatchingIds(@Param("matchingIds") Integer matchingIds);

    @Query("select p from Posting p where p.postingCode in :postingCode")
    Posting findByLikePosting(Integer postingCode);

    @Query("select p from Posting p where p.postingCode in :postingCode ")
    List<Posting> findByResultLike(@Param("postingCode") List<Integer> postingCode);


//    @Query("select a,b  from Posting a left join WorkType b on (a.postingCode = b.posting.postingCode)")
//    List<Posting> findBySelectPosting();
}
