package com.jsg.ahispringboot.company.service;

import com.jsg.ahispringboot.company.dto.PostingDTO;
import com.jsg.ahispringboot.company.entity.Posting;
import com.jsg.ahispringboot.company.entity.PostingLike;
import com.jsg.ahispringboot.company.entity.WorkType;
import com.jsg.ahispringboot.company.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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
    private final PostingLikeRepository postingLikeRepository;


    public List<PostingDTO> selectPosting() {

        List<Posting> postingList = postingRepository.findAll();

        List<PostingDTO> postingDTO = postingList.stream().map(posting -> modelMapper.map(posting, PostingDTO.class)).collect(Collectors.toList());

        System.out.println(postingDTO.get(0));

        return postingDTO;
    }

    public List<PostingDTO> matchingIdsPosting(List<Integer> matchingIds) {


        List<Posting> postingList = null;

        List<PostingDTO> postingDTOList = new ArrayList<>();

        for (int i = 0; i < matchingIds.size(); i++) {

            postingList = postingRepository.findBymatchingIds(matchingIds.get(i));

            List<PostingDTO> mappedDTOList   = postingList.stream().map(posting -> modelMapper.map(posting, PostingDTO.class)).collect(Collectors.toList());

            postingDTOList.addAll(mappedDTOList);

        }

        System.out.println(postingDTOList);





        return postingDTOList;
    }


    public List<PostingDTO> selectLikePosting(Integer memberCode) {

        List<PostingLike> postingLikes =  postingLikeRepository.findByMemberEntityId(memberCode);

        List<PostingDTO> postingDTOList = new ArrayList<>();



        for(PostingLike postingLike : postingLikes){

            Integer postingCode = postingLike.getPosting().getPostingCode();

            Posting posting = postingRepository.findByLikePosting(postingCode);

            if (posting != null) {
                PostingDTO postingDTO = modelMapper.map(posting, PostingDTO.class);
                postingDTOList.add(postingDTO);
            }


        }


        return postingDTOList;
    }


    public List<PostingDTO> selectResultLike(List<Integer> postingCode) {
        List<PostingDTO> postingDTOList = new ArrayList<>();

        List<Integer> convertedPostingCodes = new ArrayList<>();

        for (Object obj : postingCode) {
            try {
                convertedPostingCodes.add(Integer.parseInt(obj.toString()));
            } catch (NumberFormatException e) {
                // 적절한 예외 처리
                System.out.println("변환 중 오류: " + obj + "는 유효한 숫자가 아닙니다.");
            }
        }

        List<Posting> postingList = postingRepository.findByResultLike(convertedPostingCodes);

        System.out.println(postingList + "gggg");

        List<PostingDTO> mappedDTOList = postingList.stream()
                .map(posting -> modelMapper.map(posting, PostingDTO.class))
                .collect(Collectors.toList());

        postingDTOList.addAll(mappedDTOList);

        System.out.println(postingDTOList + "끄읕");

        return postingDTOList;
    }
}
