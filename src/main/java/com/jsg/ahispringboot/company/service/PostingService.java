package com.jsg.ahispringboot.company.service;

import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.repository.PostingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostingService {

    private final PostingRepository postingRepository;
    private final ModelMapper modelMapper;


    @Transactional
    public void registPosting(PostingDTO postingData) {

        Posting posting = modelMapper.map(postingData , Posting.class);

        System.out.println("gd" + posting);

        postingRepository.save(posting);

//        postingRepository.save(postingData);


    }
}
