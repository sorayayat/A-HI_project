package com.jsg.ahispringboot.company.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsg.ahispringboot.common.Criteria;
import com.jsg.ahispringboot.company.dto.CompanyDTO;
import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.entity.*;
import com.jsg.ahispringboot.company.repository.*;
import com.jsg.ahispringboot.member.dto.CompanyDto;
import com.jsg.ahispringboot.member.entity.CompanyEntity;
import com.jsg.ahispringboot.member.entity.MemberEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final PostingLikeRepository postingLikeRepository;
    private final MemberRepository2 memberRepository2;


    @Transactional
    public PostingDTO registPosting(PostingDTO postingDTO, Integer companyId) {

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

            for (String item : selectedSkillsList) {
                System.out.println(item);

                Skill skill = new Skill();

                skill.setPosting(posting);
                skill.setSkillName(item);

                skillRepository.save(skill);
            }

        } catch (IOException e) {
            e.printStackTrace();

            return null;

        }


//        PostingDTO postingDTOs = modelMapper.map(posting, PostingDTO.class);
//
//        System.out.println(postingDTOs + "안녕");

        List<WorkType> workType = workTypeRepository.findByPostingPostingCode(posting.getPostingCode());
        List<PostingExperience> postingExperiencegs = postingExperienceRepository.findByPostingPostingCode(posting.getPostingCode());
        List<Skill> skillList = skillRepository.findByPostingPostingCode(posting.getPostingCode());

        posting.setWorkTypeList(workType);
        posting.setPostingExperienceList(postingExperiencegs);
        posting.setSkillList(skillList);





        return modelMapper.map(posting, PostingDTO.class);
    }

    public List<PostingDTO> selectJobPosting() {


        List<Posting> postingList = postingRepository.findAll();

        List<PostingDTO> postingDTO = postingList.stream().map(posting -> modelMapper.map(posting, PostingDTO.class)).collect(Collectors.toList());




//        Map<String, List> map = new HashMap<>();
//
//        List<Posting> postingList = postingRepository.findAll();
//
//        List<PostingDTO> postingDTOList = postingList.stream()
//                .map(posting -> modelMapper.map(posting, PostingDTO.class))
//                .collect(Collectors.toList());
//
//
//        List<WorkType> workTypeList = workTypeRepository.findAll();
//        List<WorkTypeDTO> workTypeDTOS = workTypeList.stream().map( workType -> modelMapper.map(workType , WorkTypeDTO.class)).collect(Collectors.toList());
//
//        List<Skill> skillList = skillRepository.findAll();
//        List<SkillDTO> skillDTOS = skillList.stream().map( skill -> modelMapper.map(skill , SkillDTO.class)).collect(Collectors.toList());
//
//        List<PostingExperience> postingExperienceList = postingExperienceRepository.findAll();
//        List<PostingExperienceDTO> postingExperienceDTOS = postingExperienceList.stream().map( postingExperience -> modelMapper.map(postingExperience, PostingExperienceDTO.class)).collect(Collectors.toList());
//
//        map.put("postingList" , postingDTOList);
//        map.put("workTypeList", workTypeDTOS);
//        map.put("skillList", skillDTOS);
//        map.put("postingExperienceList" , postingExperienceDTOS);


        return postingDTO;
    }


    @Transactional
    public boolean updatePostingLike(PostingDTO postingDTO, Long memberCode) {


        Integer postingCode = postingDTO.getPostingCode();
        MemberEntity member = memberRepository2.findById(memberCode);


        Posting posting = postingRepository.findByPostingCode(postingCode);

        // 이미 존재하는지 확인
        Optional<PostingLike> existingPostingLike = postingLikeRepository.findByMemberEntityIdAndPostingPostingCode(memberCode, postingCode);

        boolean result = false;

        if (existingPostingLike.isPresent()) {
            // 이미 존재하면 삭제
            postingLikeRepository.delete(existingPostingLike.get());
        } else {
            // 존재하지 않으면 새로 저장
            PostingLike postingLike = new PostingLike();
            postingLike.setMemberEntity(member);
            postingLike.setPosting(posting);
            postingLikeRepository.save(postingLike);
            result = true;

            return result;
        }



        return result;
    }


    public boolean getPostingLike(PostingDTO postingDTO, Long memberCode) {

        Integer postingCode = postingDTO.getPostingCode();
        MemberEntity member = memberRepository2.findById(memberCode);
        Posting posting = postingRepository.findByPostingCode(postingCode);

        // 이미 존재하는지 확인
        Optional<PostingLike> existingPostingLike = postingLikeRepository.findByMemberEntityIdAndPostingPostingCode(memberCode, postingCode);

        boolean result = false;

        if (existingPostingLike.isPresent()) {
            // 이미 존재하면 삭제

            result = false;


        } else {
            // 존재하지 않으면 새로 저장

            result = true;

        }
        return result;
    }


    public List<CompanyDTO> searchCompany() {

        List<CompanyEntity> companyList = companyRepository.findAll();




        List<CompanyDTO> companyDTOList = companyList.stream().map(companyEntity -> modelMapper.map(companyEntity, CompanyDTO.class)).collect(Collectors.toList());


        return companyDTOList;
    }

    public List<PostingDTO> searchCompanyName(String searchName) {

        CompanyEntity company = companyRepository.findByCompany(searchName);



        List<Posting> postingList = postingRepository.findByCompanyCompanyId(company.getCompanyId());

        System.out.println(postingList);

        List<PostingDTO> postingDTOList = postingList.stream().map(posting -> modelMapper.map(posting, PostingDTO.class)).collect(Collectors.toList());

        return postingDTOList;
    }

    public List<PostingDTO> selectJobPostingListPaging(Criteria cri) {

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();

        Pageable paging = PageRequest.of(index, count, Sort.by("postingCode").descending());

        Page<Posting> result = postingRepository.findAll(paging);

        List<Posting> postingList = result.getContent();



        return postingList.stream().map(posting -> modelMapper.map(posting, PostingDTO.class)).collect(Collectors.toList());
    }

    public int selectPostingTotal() {

        List<Posting> postingList = postingRepository.findAll();

        return postingList.size();
    }


    @Transactional
    public void deletePosting(Integer postingCode) {

        Posting posting = postingRepository.findByPostingCode(postingCode);

        postingRepository.delete(posting);


    }

    public List<PostingDTO> selectPostingAndCompanyLogo() {

        List<CompanyEntity> companyEntities = companyRepository.findAll();


        List<PostingDTO> postingDTOList = new ArrayList<>();


        for (int i = 0; i < companyEntities.size(); i++) {

            List<Posting> postingList = postingRepository.findByCompanyCompanyId(companyEntities.get(i).getCompanyId());



            for (Posting posting : postingList) {
                Optional<Posting> optionalPosting = Optional.ofNullable(posting);

                if (optionalPosting.isPresent()) {
                    PostingDTO postingDTO = modelMapper.map(optionalPosting.get(), PostingDTO.class);
                    postingDTOList.add(postingDTO);
                }
            }
        }









        return postingDTOList;
    }
}
