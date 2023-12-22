package com.jsg.ahispringboot.company.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.dto.PostingExperienceDTO;
import com.jsg.ahispringboot.company.dto.SkillDTO;
import com.jsg.ahispringboot.company.dto.WorkTypeDTO;
import com.jsg.ahispringboot.company.entity.*;
import com.jsg.ahispringboot.company.repository.*;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostingService {

    private final PostingRepository postingRepository;
    private final CompanyRepository companyRepository;
    private final WorkTypeRepository workTypeRepository;
    private final SkillRepository skillRepository;
    private final PostingExperienceRepository postingExperienceRepository;
    private final ModelMapper modelMapper;


    @Transactional
    public void registPosting(PostingDTO postingDTO, Integer companyId) {

        CompanyEntity company = companyRepository.findByCompanyId(companyId);

        Posting posting = modelMapper.map(postingDTO, Posting.class);

        posting.setCompany(company);

        postingRepository.save(posting);

        try {

            ObjectMapper objectMapper = new ObjectMapper();

            List<String> selectedCareerList = objectMapper.readValue(postingDTO.getSelectedCareer(), new TypeReference<List<String>>() {
            });
            System.out.println("selectedCareer:");
            for (String item : selectedCareerList) {
                System.out.println(item);

                PostingExperience postingExperience = new PostingExperience();

                postingExperience.setPosting(posting);
                postingExperience.setExperienceLevel(item);

                postingExperienceRepository.save(postingExperience);

            }


            List<String> selectedConditionsList = objectMapper.readValue(postingDTO.getSelectedConditions(), new TypeReference<List<String>>() {
            });
            System.out.println("selectedConditions:");
            for (String item : selectedConditionsList) {
                System.out.println(item);

                WorkType workType = new WorkType();

                workType.setPosting(posting);
                workType.setWorkConditions(item);

                workTypeRepository.save(workType);

                System.out.println(workType);

            }


            List<String> selectedSkillsList = objectMapper.readValue(postingDTO.getSelectedSkills(), new TypeReference<List<String>>() {
            });
            System.out.println("selectedSkills:");
            for (String item : selectedSkillsList) {
                System.out.println(item);

                Skill skill = new Skill();

                skill.setPosting(posting);
                skill.setSkillName(item);

                skillRepository.save(skill);
            }

        } catch (IOException e) {
            e.printStackTrace();

        }


    }

    public Map<String, List> selectJobPosting() {

        Map<String, List> map = new HashMap<>();

        List<Posting> postingList = postingRepository.findAll();

        List<PostingDTO> postingDTOList = postingList.stream()
                .map(posting -> modelMapper.map(posting, PostingDTO.class))
                .collect(Collectors.toList());


        List<WorkType> workTypeList = workTypeRepository.findAll();
        List<WorkTypeDTO> workTypeDTOS = workTypeList.stream().map( workType -> modelMapper.map(workType , WorkTypeDTO.class)).collect(Collectors.toList());

        List<Skill> skillList = skillRepository.findAll();
        List<SkillDTO> skillDTOS = skillList.stream().map( skill -> modelMapper.map(skill , SkillDTO.class)).collect(Collectors.toList());

        List<PostingExperience> postingExperienceList = postingExperienceRepository.findAll();
        List<PostingExperienceDTO> postingExperienceDTOS = postingExperienceList.stream().map( postingExperience -> modelMapper.map(postingExperience, PostingExperienceDTO.class)).collect(Collectors.toList());

        map.put("postingList" , postingDTOList);
        map.put("workTypeList", workTypeDTOS);
        map.put("skillList", skillDTOS);
        map.put("postingExperienceList" , postingExperienceDTOS);


        return map;
    }



}
