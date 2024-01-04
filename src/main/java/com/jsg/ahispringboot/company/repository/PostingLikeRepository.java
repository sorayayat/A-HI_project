package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.PostingLike;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostingLikeRepository extends JpaRepository<PostingLike, Integer> {


    Optional<PostingLike> findByMemberEntityIdAndPostingPostingCode(Long memberCode, Integer postingCode);


    List<PostingLike> findByMemberEntityId(Integer memberCode);
}
