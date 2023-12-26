package com.jsg.ahispringboot.company.service;

import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.WorkType;
import com.jsg.ahispringboot.company.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {

    private final PostingRepository postingRepository;
    private final CompanyRepository companyRepository;
    private final WorkTypeRepository workTypeRepository;
    private final SkillRepository skillRepository;
    private final PostingExperienceRepository postingExperienceRepository;
    private final ModelMapper modelMapper;


    public List<PostingDTO> selectPosting() {

        List<Posting> postingList = postingRepository.findAll();

        List<PostingDTO> postingDTO = postingList.stream().map(posting -> modelMapper.map(posting, PostingDTO.class)).collect(Collectors.toList());

        System.out.println(postingDTO.get(0));

        return postingDTO;
    }
}
