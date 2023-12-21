package com.jsg.ahispringboot.company.repository;

import com.jsg.ahispringboot.company.entity.Posting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingRepository extends JpaRepository<Posting , Integer> {


}
